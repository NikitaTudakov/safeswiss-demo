import { Component, OnInit } from '@angular/core';
import { AppRequest, getChatResp, message } from 'src/interface/app.interface';
// @ts-ignore
import { WebClient } from '../assets/js/webClient.js';
import { RequestNamesEnum } from './enum/request-names.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public webClient: any;
    public chatIdList: number[] = [];
    public messages: message[] = [];

    public requests: AppRequest[] = [
        {   name:RequestNamesEnum.AUTHORIZE,
            args:[{name:'login',type:'string'},{name:'password',type:'string'}],
            method:'authorize'
        },
        {   name:RequestNamesEnum.ADD_CONTACT,
            args:[{name:'contactId',type:'string'},{name:'contact name', type: 'string',required: false}],
            method:'addContact'
        },
        {   name:RequestNamesEnum.GET_CONTACTS,
            args:[],
            method:'getContactList'
        },
        {   name:RequestNamesEnum.GET_CHATS,
            args:[],
            method:'getChatList'
        },
        {   name:RequestNamesEnum.SEND_TEXT_MESSAGE,
            args:[{name:'chatId',type:'chatId-select'},{name:'text',type:'string'}],
            method:'sendMessage'
        },
        {   name:RequestNamesEnum.SEND_FILE,
            args:[{name:'chatId',type:'chatId-select'},{name:'messageType',type:'message-select'},{name:'binaryData',type:'file'}],
            method:'sendFileMessage'
        },
        {   name:RequestNamesEnum.CREATE_CHAT,
            args:[{name:'userId',type:'string'}],
            method:'createChat'
        }
    ]

    async ngOnInit(): Promise<void> {
        this.webClient = new WebClient();
        await this.webClient.connect('ws://localhost:10108');
        const getCharResp = await this.webClient.getChats();
        this.chatIdList = getCharResp.map((chat: getChatResp) => chat.chatId);
        this._chatChangeSub();
    }

    private async _chatChangeSub() {
        this.webClient.onchatchanged = async (args:any) => {
            const msg = await this.webClient.getChatMessage(args.chatId, args.messageId);
            this.messages.unshift({
                when:msg.when,
                user:msg.user,
                message:msg.type == 0 ? msg.message : JSON.stringify(msg)
            });
        }
    }
}
