import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-explore-court-building',
  templateUrl: './explore-court-building.component.html',
  styles: []
})
export class ExploreCourtBuildingComponent {
  constructor(private journey: IndividualJourney) {}

  continue() {
    this.journey.goto(IndividualJourneySteps.CourtInformationVideo);
  }
}
