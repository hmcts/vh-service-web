import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})

export class AboutYouComponent {

  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    this.journey = journey;
  }
}
