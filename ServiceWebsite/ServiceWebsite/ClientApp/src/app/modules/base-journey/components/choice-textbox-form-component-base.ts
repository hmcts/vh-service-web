import { ChoiceTextboxForm } from './choice-textbox-form';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';

export abstract class ChoiceTextboxFormComponentBase implements OnInit {

    protected textboxForm = new ChoiceTextboxForm();

    get form(): FormGroup { return this.textboxForm.form; }

    get choice(): FormControl { return this.textboxForm.choice; }

    get textInput(): FormControl { return this.textboxForm.textInput; }

    get isFormInvalid(): boolean { return this.textboxForm.isFormInvalid; }

    get isTextInputInvalid(): boolean { return this.textboxForm.isTextInputInvalid; }

    ngOnInit(): void {
        this.textboxForm.submitted.subscribe(() => this.bind());
    }

    continue(): void {
        this.textboxForm.submit();
    }

    protected abstract bind(): void;
}
