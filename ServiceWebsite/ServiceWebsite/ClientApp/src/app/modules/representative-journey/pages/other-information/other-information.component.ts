import { Component } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';
import {Logger} from '../../../../services/logger';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styles: []
})
export class OtherInformationComponent {

  constructor(private journey: RepresentativeJourney, private logger: Logger) {
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }
  // async submit(): Promise<void> {
  //  // await this.journey.submitQuestionnaire();
  //  this.logger.event('telemetry:serviceweb:any:questionnaire:complete');
  //  this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
  // }

  async submit(): Promise<void> {
    this.journey.goto(RepresentativeJourneySteps.CheckYourAnswers);
     }
}
