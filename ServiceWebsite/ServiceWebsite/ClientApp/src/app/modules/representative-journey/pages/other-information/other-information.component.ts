import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent
} from 'src/app/modules/representative-journey/components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styles: []
})
export class OtherInformationComponent {

  constructor(private journey: RepresentativeJourney) {
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }
  async submit(): Promise<void> {
    await this.journey.submitQuestionnaire();
    this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
  }
}
