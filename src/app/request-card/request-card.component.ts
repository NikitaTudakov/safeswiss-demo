import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppArgument, AppRequest, DropDownOption } from 'src/interface/app.interface';
import { RequestNamesEnum } from '../enum/request-names.enum';

@Component({
    selector: 'app-request-card',
    templateUrl: './request-card.component.html',
    styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
    @Input() request!: AppRequest;
    @Input() webClient: any;
    @Input() chatIdList!: number[];
    @ViewChild('fileInput') fileInput!: ElementRef;
    public requestForm!: FormGroup;
    public requestTypes = RequestNamesEnum;
    public reply: any = null;
    public isValidFile: boolean = true;

    get args(): AppArgument[] {
        return this.request.args
    }

    public messageOptionList: DropDownOption[] = [
        {name: 'Image', value:1},
        {name: 'Video', value:5},
        {name: 'Document', value:6}
    ];

    constructor() { }

    ngOnInit(): void {
        this.requestForm = new FormGroup({});
        this._initRequestFormControls();
    }

    async sendRequest() {
        this.reply = null;
        switch(this.request.name) {
            case RequestNamesEnum.AUTHORIZE:
                this.reply = await this.webClient.authorize(this.requestForm.get('login')?.value,this.requestForm.get('password')?.value);
                break;
            case RequestNamesEnum.ADD_CONTACT:
                this.reply = await this.webClient.addContact(this.requestForm.get('contactId')?.value,this.requestForm.get('contact name')?.value);
                break;
            case RequestNamesEnum.GET_CHATS:
                this.reply = await this.webClient.getChats();
                break;
            case RequestNamesEnum.SEND_TEXT_MESSAGE:
                this.reply = await this.webClient.sendMessage(this.requestForm.get('chatId')?.value,this.requestForm.get('text')?.value);
                break;
            case RequestNamesEnum.SEND_FILE:
                this.reply = await this.webClient.sendFileMessage(
                    this.requestForm.get('chatId')!.value,this.requestForm.get('binaryData')!.value,this.requestForm.get('messageType')!.value
                );
                break;
            case RequestNamesEnum.CREATE_CHAT:
                this.reply = await this.webClient.createChat(this.requestForm.get('userId')?.value.split(','));
                break;
            default:
                this.reply = await this.webClient.authorize('nsvw', 'Qwerty1');
        }
    }

    public clearForm(): void {
        this.requestForm.reset();
        this.reply = null;
    }

    public updateFileInput(): void {
        const files = this.fetchFilesFromInput();
        console.log(files);
        if(files) {
            console.log('valid');
            this.isValidFile = true;
            this.requestForm.get('binaryData')?.patchValue(files);
            this.requestForm.markAsDirty();
        } else {
            console.log('not valid');
            this.isValidFile = false;
        }
    }

    private _initRequestFormControls(): void {
        this.args.forEach(argument => {
            this.requestForm.addControl(argument.name, new FormControl('',Validators.required));
        });
    }

    private fetchFilesFromInput(): File[] | null {
		const inputElement = this.fileInput.nativeElement;
		return inputElement.files && inputElement.files.length > 0 ?
			<File[]>inputElement.files : null;
	}
}
