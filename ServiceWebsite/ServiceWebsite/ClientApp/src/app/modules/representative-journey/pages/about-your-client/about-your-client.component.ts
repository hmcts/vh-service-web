import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent {
  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    this.journey =  journey;
  }
}
