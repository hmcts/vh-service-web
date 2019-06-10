import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../base-journey/components/suitability-choice-page-base.component';
import { Injectable } from '@angular/core';
import { IndividualJourney } from '../individual-journey';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

@Injectable()
export abstract class SuitabilityChoicePageBaseComponent
  extends GenericSuitabilityChoicePageBaseComponent<IndividualJourney> {

  get model(): IndividualSuitabilityModel {
    return this.journey.model;
  }
}
