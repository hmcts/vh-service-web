import { IndividualJourneySteps } from './../individual-journey';
import { Component } from '@angular/core';
import { ComponentBase } from '../component-base';
import { IndividualJourney } from '../individual-journey';

@Component({
  selector: 'app-about-hearings',
  templateUrl: './about-hearings.component.html',
  styleUrls: ['./about-hearings.component.css']
})
export class AboutHearingsComponent extends ComponentBase {
  constructor(protected journey: IndividualJourney) {
    super(journey);
    this.journey.enter(IndividualJourneySteps.AboutHearings);
  }
}
