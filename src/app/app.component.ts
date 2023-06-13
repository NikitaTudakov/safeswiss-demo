import { Component } from '@angular/core';
import { AppRequest } from 'src/interface/app.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public requests: AppRequest[] = [
        {   name:'Authorize',
            args:[{name:'login',type:'string'},{name:'password',type:'string'}],
            method:'authorize'
        },
        {   name:'Add contact',
            args:[{name:'contactId',type:'string'}],
            method:'addContact'
        },
        {   name:'Get chats',
            args:[],
            method:'getChatList'
        },
        {   name:'Send text message',
            args:[{name:'chatId',type:'number'},{name:'text',type:'string'}],
            method:'sendMessage'
        },
        {   name:'Send image\/file message',
            args:[{name:'chatId',type:'number'},{name:'messageType',type:'message-select'},{name:'binaryData',type:'file'}],
            method:'sendFileMessage'
        },
        {   name:'Create chat\chat group',
            args:[{name:'login',type:'string'}],
            method:'createChat'
        }
    ]
}
