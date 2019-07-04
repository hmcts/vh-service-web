import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent {
  constructor(private journey: RepresentativeJourney) {}

  submit() {
    this.journey.goto(RepresentativeJourneySteps.ClientAttendance);
  }
}
