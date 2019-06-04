import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export abstract class SuitabilityChoicePageBaseComponent {
  readonly choice = new FormControl('', Validators.required);

  submitted = false;

  readonly form = new FormGroup({
    choice: this.choice
  });

  get isFormInvalid(): boolean {
    return this.form.invalid && this.submitted;
  }

  protected abstract onFormAccepted(): void;

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
