import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-your-video-hearing',
  templateUrl: './your-video-hearing.component.html',
  styleUrls: []
})
export class YourVideoHearingComponent {
  constructor(private journey: RepresentativeJourney) {}

  continue() {
    
  }
}
