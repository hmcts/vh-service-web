import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUrls } from '../shared/page-url.constants';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';

// Placeholder component for the citizen journey video hearing suitability checklist start page
@Component({
  selector: 'app-check-suitability-for-video',
  templateUrl: './check-suitability-for-video.component.html',
})
export class CheckSuitabilityForVideoComponent implements OnInit {
  localeResources: any;

  constructor(private router: Router) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() { }

  startChecklist() {
    this.router.navigate([PageUrls.UseSameComputer]);
  }
}
