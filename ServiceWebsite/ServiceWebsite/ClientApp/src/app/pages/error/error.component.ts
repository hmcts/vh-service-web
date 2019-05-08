import { Component } from '@angular/core';
import { Constants } from 'src/app/modules/shared/constants';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  showTextDetails = false;
  contactUsEmail: string;

  constructor() {
    this.contactUsEmail = Constants.ContactUsEmail;
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }
}
