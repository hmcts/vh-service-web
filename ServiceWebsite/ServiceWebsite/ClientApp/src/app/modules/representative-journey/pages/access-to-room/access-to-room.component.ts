import { Component, OnInit } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-access-to-room',
  templateUrl: './access-to-room.component.html',
  styleUrls: ['./access-to-room.component.css']
})
export class AccessToRoomComponent extends RepresentativeBaseComponent {

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

   // this.bindModel();
    super.continue();
  }

  /**
   * Bind the value to the model
   */
 // protected abstract bindModel(): void;
}
