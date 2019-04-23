import { Component, OnInit } from '@angular/core';
import { LocaleResources } from 'src/app/modules/shared/resources/locale-resources';
import { CONFIG } from 'src/app/modules/shared/config';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

  localeResources: any;
  showTextDetails = false;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }
  ngOnInit() {
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }
}
