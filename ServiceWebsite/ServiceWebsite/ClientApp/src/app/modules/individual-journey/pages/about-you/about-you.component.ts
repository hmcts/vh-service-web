import { Component, OnInit } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent extends IndividualBaseComponent implements OnInit {
  readonly textInput = new FormControl('');
  readonly choice = new FormControl('', Validators.required);

  readonly form = new FormGroup({
    textInput: this.textInput,
    choice: this.choice
  });

  submitted = false;

  ngOnInit() {
    this.choice.valueChanges.subscribe(value => {
      if (value) {
        // If the value is true, the text input is required
        this.textInput.setValidators(Validators.required);
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

  get isFormInvalid(): boolean {
      return this.form.invalid && this.submitted;
  }

  continue() {
    this.textInput.markAsTouched();
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.bindModel(this.choice.value, this.textInput.value);
    super.continue();
  }

  private bindModel(answer: boolean, notes: string): void {
    this.model.aboutYou.answer = answer;
    this.model.aboutYou.notes = answer ? notes : null;
  }
}
