import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  protected onFormAccepted() {
    this.journey.next();
  }

  get isInvalid(): boolean {
    return this.form.invalid && this.submitted;
  }

  continue() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.bindModel();
    this.onFormAccepted();
  }

  /**
   * Bind the value to the model
   */
  protected abstract bindModel(): void;
}
