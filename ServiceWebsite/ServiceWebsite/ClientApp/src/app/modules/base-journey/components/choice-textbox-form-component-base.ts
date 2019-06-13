import { ChoiceTextboxForm } from './choice-textbox-form';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';

export abstract class ChoiceTextboxFormComponentBase implements OnInit {

    protected choiceForm = new ChoiceTextboxForm();

    get form(): FormGroup { return this.choiceForm.formGroup; }

    get choice(): FormControl { return this.choiceForm.choice; }

    get textInput(): FormControl { return this.choiceForm.textInput; }

    get isInvalid(): boolean { return this.choiceForm.isInvalid; }

    get isTextInputInvalid(): boolean { return this.choiceForm.isTextInputInvalid; }

    ngOnInit(): void {
        this.choiceForm.submitted.subscribe(() => this.bind());
    }

    continue(): void {
        this.choiceForm.submit();
    }

    protected abstract bind(): void;
}
