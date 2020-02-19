import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';


@Component({
  selector: 'app-answers-saved',
  templateUrl: './answers-saved.component.html'
})

export class AnswersSavedComponent {
  constructor(private journey: RepresentativeJourney) {
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }

  continue() {
    this.journey.model.checkYourAnswers = true;
    this.journey.goto(SelfTestJourneySteps.CheckYourComputer);
  }
}

