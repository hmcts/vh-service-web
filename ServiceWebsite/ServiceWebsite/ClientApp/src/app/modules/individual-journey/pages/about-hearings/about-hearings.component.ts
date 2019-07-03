import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-about-hearings',
  templateUrl: './about-hearings.component.html'
})
export class AboutHearingsComponent {
  constructor(private journey: IndividualJourney) {}

  continue() {
    this.journey.goto(IndividualJourneySteps.DifferentHearingTypes);
  }
}
