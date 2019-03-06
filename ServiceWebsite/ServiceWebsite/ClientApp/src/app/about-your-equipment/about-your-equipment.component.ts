import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUrls } from '../shared/page-url.constants';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';

@Component({
  selector: 'app-about-your-equipment',
  templateUrl: './about-your-equipment.component.html'
})
export class AboutYourEquipmentComponent implements OnInit {
  localeResources: any;

  constructor(private router: Router) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
  }

  start(): void {
    this.router.navigate([PageUrls.CompatibilityCheck]);
  }
}
