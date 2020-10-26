import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-different-hearing-types',
  templateUrl: './different-hearing-types.component.html'
})
export class DifferentHearingTypesComponent {
  constructor(private journey: IndividualJourney) {}

  continue() {
    this.journey.goto(IndividualJourneySteps.AboutYou);
  }
}
