import {Component} from '@angular/core';
import {IndividualJourney} from '../../individual-journey';
import {IndividualSuitabilityModel} from '../../individual-suitability.model';
import {SelfTestJourneySteps} from 'src/app/modules/self-test-journey/self-test-journey-steps';


@Component({
  selector: 'app-answers-saved',
  templateUrl: './answers-saved.component.html',
  styleUrls: ['./answers-saved.component.css']
})

export class AnswersSavedComponent {
    constructor(private journey: IndividualJourney) {
  }

    get model(): IndividualSuitabilityModel {
    return this.journey.model;
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.CheckYourComputer);
  }
}

