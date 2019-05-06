import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IndividualBaseComponent } from '../pages/individual-base-component/individual-base.component';

export abstract class SuitabilityChoicePageBaseComponent extends IndividualBaseComponent {
  readonly choice = new FormControl('', Validators.required);

  submitted = false;

  readonly form = new FormGroup({
    choice: this.choice
  });

  get isFormInvalid(): boolean {
    return this.form.invalid && this.submitted;
  }

  continue() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.bindModel();
    super.continue();
  }

  /**
   * Bind the value to the model
   */
  protected abstract bindModel(): void;
}
