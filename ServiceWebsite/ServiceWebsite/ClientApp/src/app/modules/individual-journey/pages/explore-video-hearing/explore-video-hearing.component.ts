import { Component } from '@angular/core';
import { DeviceType } from '../../../base-journey/services/device-type';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-explore-video-hearing',
  templateUrl: './explore-video-hearing.component.html'
})
export class ExploreVideoHearingComponent {

  constructor(private journey: IndividualJourney, private deviceType: DeviceType) {}

  get isMobile(): boolean {
      return this.deviceType.isMobile() || this.deviceType.isTablet();
  }

  continue() {
    if (this.isMobile) {
      this.journey.goto(IndividualJourneySteps.HearingAsParticipant);
    } else {
      this.journey.goto(IndividualJourneySteps.AccessToCameraAndMicrophone);
    }
  }
}
