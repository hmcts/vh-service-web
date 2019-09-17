import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {AboutHearingsComponent} from '../individual-journey/pages/about-hearings/about-hearings.component';
import {Observable} from 'rxjs';
import {IndividualJourneySteps} from '../individual-journey/individual-journey-steps';

@Injectable({
  providedIn: 'root',
})
export class CanNavigateGuard implements CanDeactivate<AboutHearingsComponent> {
  canDeactivate(
    component: AboutHearingsComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (nextState !== undefined) {
      return nextState.url === '/different-hearing-types';
    }

    return true;
  }
}
