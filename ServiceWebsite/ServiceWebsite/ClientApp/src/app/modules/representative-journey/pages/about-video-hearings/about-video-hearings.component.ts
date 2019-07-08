import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-about-video-hearings',
  templateUrl: './about-video-hearings.component.html',
  styleUrls: []
})
export class AboutVideoHearingsComponent {
  constructor(private journey: RepresentativeJourney) {}

  continue() {
    this.journey.goto(RepresentativeJourneySteps.AboutYouAndYourClient);
  }
}
