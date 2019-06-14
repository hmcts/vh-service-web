import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent {

  readonly journey: IndividualJourney;

  constructor(journey: IndividualJourney) {
    this.journey = journey;
  }
}
