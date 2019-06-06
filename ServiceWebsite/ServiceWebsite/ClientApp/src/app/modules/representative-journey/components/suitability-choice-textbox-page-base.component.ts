import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../base-journey/components/suitability-choice-page-base.component';
import { Injectable, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../representative-journey';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { FormControl, Validators } from '@angular/forms';
import { ValidateForWhiteSpace } from '../../shared/validators/whitespace-validator';

@Injectable()
export abstract class SuitabilityChoiceTextboxPageBaseComponent<T>
  extends GenericSuitabilityChoicePageBaseComponent implements OnInit {

  constructor(private journey: RepresentativeJourney) {
    super();
  }

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

  protected onFormAccepted() {
    this.journey.next();
  }

  get isTextInputInvalid(): boolean {
    return this.textInput.invalid && this.submitted;
  }

  continue() {
    this.textInput.markAsTouched();
    super.continue();
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }
}
