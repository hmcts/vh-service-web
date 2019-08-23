import { Injectable } from '@angular/core';
import { NavigationBackBaseFactory } from '../base-journey/services/navigation-back-base.factory';
import { Router } from '@angular/router';

const IndividualUserType = 'Individual';
const ThankYouUrl = '/thank-you';
const CheckYourComputerUrl = '/check-your-computer';

@Injectable()
export class IndividualNavigationBackFactory extends NavigationBackBaseFactory {

  constructor(protected router: Router) {
    super(router, IndividualUserType, [ThankYouUrl, CheckYourComputerUrl]);
  }
}
