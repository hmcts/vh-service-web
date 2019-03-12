import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleResources } from 'src/app/shared/resources/locale-resources';
import { CONFIG } from 'src/app/shared/config';
import { PageUrls } from 'src/app/shared/page-url.constants';

@Component({
  selector: 'app-continue-to-questions',
  templateUrl: './continue-to-questions.component.html'
})
export class ContinueToQuestionsComponent implements OnInit {

  localeResources: any;

  constructor(private router: Router) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
  }

  continueToQuestions(): void {
    this.router.navigate([PageUrls.MakeTheCourtAware]);
  }
}
