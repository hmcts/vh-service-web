import { Component, OnInit } from '@angular/core';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  localeResources: any;
  showTextDetails: boolean = false;
  contactUsEmail: string;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.contactUsEmail = Constants.ContactUsEmail;
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }
}
