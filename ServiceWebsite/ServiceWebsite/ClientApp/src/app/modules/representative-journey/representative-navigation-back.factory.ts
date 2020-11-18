import { Injectable } from '@angular/core';
import { NavigationBackBaseFactory } from '../base-journey/services/navigation-back-base.factory';
import { Router } from '@angular/router';

const RepresentativeUserType = 'Representative';
const ThankYouRepUrl = '/thank-you-rep';

@Injectable()
export class RepresentativeNavigationBackFactory extends NavigationBackBaseFactory {
    constructor(protected router: Router) {
        super(router, RepresentativeUserType, [ThankYouRepUrl]);
    }
}
