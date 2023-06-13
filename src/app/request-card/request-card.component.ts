import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppArgument, AppRequest, DropDownOption } from 'src/interface/app.interface';

@Component({
    selector: 'app-request-card',
    templateUrl: './request-card.component.html',
    styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
    @Input() request!: AppRequest;
    @ViewChild('fileInput') fileInput!: ElementRef;
    public requestForm!: FormGroup;

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


    public onFileSelected() {

    }

    public sendRequest() {
        console.log(this.requestForm.value)
    }

    public clearForm(): void {
        this.requestForm.reset()
    }

    private _initRequestFormControls(): void {
        this.args.forEach(argument => {
            this.requestForm.addControl(argument.name, new FormControl('',Validators.required));
        });
    }
}
