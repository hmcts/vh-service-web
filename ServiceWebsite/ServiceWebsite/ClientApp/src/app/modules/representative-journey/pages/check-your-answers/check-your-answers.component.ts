import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { Logger } from 'src/app/services/logger';

@Component({
  selector: 'app-check-your-answers',
  templateUrl: './check-your-answers.component.html',
  styleUrls: ['./check-your-answers.component.css']
})

export class CheckYourAnswersComponent {
  mode: string;
  constructor(private journey: RepresentativeJourney, private logger: Logger) {
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }

  continue() {
    this.journey.submitQuestionnaire();
    this.logger.event('telemetry:serviceweb:any:questionnaire:complete');
    this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
  }
}
