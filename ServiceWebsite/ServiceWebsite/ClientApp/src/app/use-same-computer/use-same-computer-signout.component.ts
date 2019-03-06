import { Component, OnInit } from '@angular/core';
import { LocaleResources } from 'src/app/shared/resources/locale-resources';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-use-same-computer-signout',
  templateUrl: './use-same-computer-signout.component.html'
})
export class UseSameComputerSignoutComponent implements OnInit {
  localeResources: any;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
  }
}
