import { Component, OnInit } from '@angular/core';
import { AppRequest, getChatResp } from 'src/interface/app.interface';
// @ts-ignore
import { WebClient } from '../assets/js/webClient.js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public webClient: any;
    public chatIdList: number[] = [];

    public requests: AppRequest[] = [
        {   name:'Authorize',
            args:[{name:'login',type:'string'},{name:'password',type:'string'}],
            method:'authorize'
        },
        {   name:'Add contact',
            args:[{name:'contactId',type:'string'},{name:'contact name', type: 'string'}],
            method:'addContact'
        },
        {   name:'Get chats',
            args:[],
            method:'getChatList'
        },
        {   name:'Send text message',
            args:[{name:'chatId',type:'chatId-select'},{name:'text',type:'string'}],
            method:'sendMessage'
        },
        {   name:'Send image\/file message',
            args:[{name:'chatId',type:'chatId-select'},{name:'messageType',type:'message-select'},{name:'binaryData',type:'file'}],
            method:'sendFileMessage'
        },
        {   name:'Create chat\/group',
            args:[{name:'userId',type:'string'}],
            method:'createChat'
        }
    ]

    async ngOnInit(): Promise<void> {
        this.webClient = new WebClient();
        await this.webClient.connect('ws://localhost:10108');
        const getCharResp = await this.webClient.getChats();
        this.chatIdList = getCharResp.map((chat: getChatResp) => chat.chatId);
    }
}
