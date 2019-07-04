import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent {
  constructor(private journey: RepresentativeJourney) {}

  submit() {
    this.journey.goto(RepresentativeJourneySteps.AccessToRoom);
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }
}
