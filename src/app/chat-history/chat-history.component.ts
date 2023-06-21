import { Component, OnInit, Input } from '@angular/core';
import { message } from 'src/interface/app.interface';

@Component({
    selector: 'app-chat-history',
    templateUrl: './chat-history.component.html',
    styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent implements OnInit {
    @Input() messages: message[] = [];
    constructor() { }

    ngOnInit(): void {
    }

}
