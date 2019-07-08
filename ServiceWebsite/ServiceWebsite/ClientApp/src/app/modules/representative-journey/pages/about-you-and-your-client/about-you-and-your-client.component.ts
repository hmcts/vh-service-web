import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-about-you-and-your-client',
  templateUrl: './about-you-and-your-client.component.html',
  styleUrls: []
})
export class AboutYouAndYourClientComponent {
  constructor(private journey: RepresentativeJourney) {}

  continue() {
    this.journey.goto(RepresentativeJourneySteps.AboutYou);
  }
}
