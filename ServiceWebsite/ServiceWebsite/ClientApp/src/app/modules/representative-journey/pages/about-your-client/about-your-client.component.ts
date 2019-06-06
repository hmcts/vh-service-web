import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidateForWhiteSpace } from 'src/app/modules/shared/validators/whitespace-validator';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent
  extends SuitabilityChoicePageBaseComponent implements OnInit {

  readonly textInput = new FormControl('');

  ngOnInit() {
    this.form.addControl('textInput', this.textInput);

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
      this.form.updateValueAndValidity();

      // if we've tried submitting without and answer select an answer that has another required field
      // we want to treat this as "a new form", the user hasn't seen these fields so we need to treat the
      // form as pristine until the next time the user has tried to submit, this reduces flickering of the
      // error messages as the user focuses/blurs and enters text
      this.submitted = false;
    });
  }

  get isTextInputInvalid(): boolean {
    return this.textInput.invalid && this.submitted;
  }

  continue() {
    this.textInput.markAsTouched();
    super.continue();
  }

  protected bindModel(): void {
    this.model.aboutYourClient.answer = this.choice.value;
    this.model.aboutYourClient.notes = this.choice.value ? this.textInput.value : null;
  }
}
