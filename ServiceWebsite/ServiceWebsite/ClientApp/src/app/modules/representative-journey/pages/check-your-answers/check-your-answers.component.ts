import {Component} from '@angular/core';
import {RepresentativeJourney} from '../../representative-journey';
import {RepresentativeSuitabilityModel} from '../../representative-suitability.model';
import {SelfTestJourneySteps} from 'src/app/modules/self-test-journey/self-test-journey-steps';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';


@Component({
  selector: 'app-check-your-answers',
  templateUrl: './check-your-answers.component.html',
  styleUrls: ['./check-your-answers.component.css']
})

export class CheckYourAnswersComponent {
  constructor(private journey: RepresentativeJourney) {
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }

  continue() {
    this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
  }
}

