import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import {CanComponentNavigate} from '../../../shared/can.component.navigate';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-about-hearings',
  templateUrl: './about-hearings.component.html',
  styles: []
})
export class AboutHearingsComponent implements CanComponentNavigate {
  constructor(private journey: IndividualJourney) {}

  continue() {
    this.journey.goto(IndividualJourneySteps.DifferentHearingTypes);
  }

  canDeactivate(): Observable<boolean> | boolean {
    console.log('***** can navigate');
    return false;
  }
}
