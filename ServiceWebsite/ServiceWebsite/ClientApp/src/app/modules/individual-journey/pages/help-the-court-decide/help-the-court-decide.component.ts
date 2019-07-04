import { IndividualJourney } from './../../individual-journey';
import { Component } from '@angular/core';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-help-the-court-decide',
  templateUrl: './help-the-court-decide.component.html',
  styles: []
})
export class HelpTheCourtDecideComponent {
  constructor(private journey: IndividualJourney) {}

  continue() {
    this.journey.goto(IndividualJourneySteps.AboutYou);
  }
}
