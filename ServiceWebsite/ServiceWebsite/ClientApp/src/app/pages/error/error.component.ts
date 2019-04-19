import { Component } from '@angular/core';
import { LocaleResources } from 'src/app/modules/shared/resources/locale-resources';
import { Constants } from 'src/app/modules/shared/constants';
import { CONFIG } from 'src/app/modules/shared/config';

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
