import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import {JourneyStep} from '../../../base-journey/journey-step';

@Component({
  selector: 'app-about-hearings',
  templateUrl: './about-hearings.component.html',
  styles: []
})
export class AboutHearingsComponent {
  constructor(private journey: IndividualJourney) {}

  get nextStep(): JourneyStep {
    return IndividualJourneySteps.DifferentHearingTypes;
  }

  continue() {
    this.journey.goto(this.nextStep);
  }
}
