import { EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

export class ChoiceForm {
    readonly choice = new FormControl('', Validators.required);

    readonly submitted = new EventEmitter();

    protected formSubmitted = false;

    readonly formGroup = new FormGroup({
        choice: this.choice
    });

    get isFormInvalid(): boolean {
        return this.formGroup.invalid && this.formSubmitted;
    }

    submit() {
        this.formSubmitted = true;

        if (this.formGroup.invalid) {
            return;
        }

        this.submitted.emit();
    }
}
