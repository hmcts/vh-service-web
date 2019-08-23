import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/modules/shared/constants';
import { SessionStorage } from '../../modules/shared/services/session-storage';
import { NavigateBackUrlModel } from '../../modules/base-journey/services/navigate-back-url.model';

@Component({
  selector: 'app-questionnaire-already-completed',
  templateUrl: './questionnaire-already-completed.component.html'
})
export class QuestionnaireAlreadyCompletedComponent {
  private readonly cache: SessionStorage<NavigateBackUrlModel>;
  showTextDetails = false;
  contactUsEmail: string;

  constructor(private router: Router) {
    this.contactUsEmail = Constants.ContactUsEmail;
    this.cache = new SessionStorage<NavigateBackUrlModel>('NAVIGATEBACKURL_MODEL');
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }

  continue() {
    const navigateUrlModel = this.cache.get();
    if (navigateUrlModel.url) {
      this.router.navigate([navigateUrlModel.url]);
    }
  }
}

