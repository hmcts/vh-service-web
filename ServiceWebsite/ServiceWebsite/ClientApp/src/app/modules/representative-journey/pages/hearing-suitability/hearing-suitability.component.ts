import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-hearing-suitability',
  templateUrl: './hearing-suitability.component.html',
  styles: []
})
export class HearingSuitabilityComponent {

  constructor(private journey: RepresentativeJourney) {}

  submit() {
    this.journey.goto(RepresentativeJourneySteps.AccessToComputer);
  }
}
