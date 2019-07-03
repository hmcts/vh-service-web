import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../base-journey/components/suitability-choice-page-base.component';
import { Injectable } from '@angular/core';
import { SelfTestJourney } from '../self-test-journey';
import {ParticipantSuitabilityModel} from '../../base-journey/participant-suitability.model';

@Injectable()
export abstract class SelfTestSuitabilityChoicePageBaseComponent
  extends GenericSuitabilityChoicePageBaseComponent<SelfTestJourney> {

  get model(): ParticipantSuitabilityModel {
    return this.journey.model;
  }
}
