import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from "@angular/core";

@Injectable()
export abstract class SuitabilityChoicePageBaseComponent<TJourneyType extends JourneyBase> {
  readonly choice = new FormControl('', Validators.required);

  submitted = false;

  readonly form = new FormGroup({
    choice: this.choice
  });

  protected journey: TJourneyType;

  constructor(journey: TJourneyType) {
    this.journey = journey;
  }

  get isFormInvalid(): boolean {
    return this.form.invalid && this.submitted;
  }

  trySubmit(): boolean {
    this.submitted = true;

    if (this.form.invalid) {
      return false;
    }

    this.bindModel();
    return true;
  }

  /**
   * Bind the value to the model
   */
  protected abstract bindModel(): void;
}
