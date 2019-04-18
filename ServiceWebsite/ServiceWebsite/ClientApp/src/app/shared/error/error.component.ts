import { Component } from '@angular/core';
import { LocaleResources } from '../resources/locale-resources';
import { CONFIG } from '../config';
import { Constants } from '../constants';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  localeResources: any;
  showTextDetails = false;
  contactUsEmail: string;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.contactUsEmail = Constants.ContactUsEmail;
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }
}
