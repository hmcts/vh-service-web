import { ChoiceForm } from './choice-form';
import {FormControl, FormControlName, Validators} from '@angular/forms';
import { ValidateForWhiteSpace } from '../../shared/validators/whitespace-validator';

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

export class ChoiceTextboxForm extends ChoiceForm {

    readonly textInput = new FormControl('');

    constructor() {
      super();
      this.formGroup.addControl('textInput', this.textInput);

      this.choice.valueChanges.subscribe(value => {
        if (value) {
          // If the value is true, the text input is required
          this.textInput.setValidators([Validators.required, ValidateForWhiteSpace]);
          this.textInput.markAsUntouched();
        } else {
          this.textInput.clearValidators();
        }

        // calling these will update the forms validity based on the changed validators
        this.textInput.updateValueAndValidity();
        this.formGroup.updateValueAndValidity();

        // if we've tried submitting without and answer select an answer that has another required field
        // we want to treat this as "a new form", the user hasn't seen these fields so we need to treat the
        // form as pristine until the next time the user has tried to submit, this reduces flickering of the
        // error messages as the user focuses/blurs and enters text
        this.formSubmitted = false;
      });
    }

    get isTextInputInvalid(): boolean {
      return this.textInput.invalid && this.formSubmitted;
    }

    submit() {
      const textInputElement = (<any>this.textInput).nativeElement;
      if (textInputElement) {
        textInputElement.focus();
      }

      this.textInput.markAsTouched();
      super.submit();
    }
}
