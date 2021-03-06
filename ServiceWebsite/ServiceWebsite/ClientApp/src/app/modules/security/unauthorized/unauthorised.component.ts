import { Component } from '@angular/core';
import { CONFIG } from '../../shared/config';
import { LocaleResources } from '../../shared/resources/locale-resources';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html'
})
export class UnauthorisedComponent {

  localeResources: any;
  showTextDetails = false;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }
}
