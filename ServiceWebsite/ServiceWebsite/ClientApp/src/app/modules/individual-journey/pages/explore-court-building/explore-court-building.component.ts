import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

@Component({
  selector: 'app-explore-court-building',
  templateUrl: './explore-court-building.component.html',
  styles: []
})
export class ExploreCourtBuildingComponent {
  constructor(private journey: IndividualJourney, private deviceType: DeviceType) {}

  continue() {
    if (this.deviceType.isMobile() || this.deviceType.isTablet()) {
      this.journey.goto(IndividualJourneySteps.SignInOnComputer);
      return;
    }
    this.journey.goto(IndividualJourneySteps.CourtInformationVideo);
  }
}
