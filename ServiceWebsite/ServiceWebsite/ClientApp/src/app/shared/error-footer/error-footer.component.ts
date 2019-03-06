import { Component, OnInit } from '@angular/core';
import { LocaleResources } from '../resources/locale-resources';
import { CONFIG } from '../config';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-error-footer',
  templateUrl: './error-footer.component.html'
})
export class ErrorFooterComponent implements OnInit {

  localeResources: any;
  showTextDetails: boolean = false;
  contactUsEmail: string;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
    this.contactUsEmail = Constants.ContactUsEmail;
  }

  ngOnInit() {
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }
}
