import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../base-journey/components/suitability-choice-page-base.component';
import { Injectable } from '@angular/core';
import { RepresentativeJourney } from '../representative-journey';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';

@Injectable()
export abstract class SuitabilityChoicePageBaseComponent extends GenericSuitabilityChoicePageBaseComponent {
  constructor(private journey: RepresentativeJourney) {
    super();
  }

  protected onFormAccepted() {
    this.journey.next();
  }

  get model(): RepresentativeSuitabilityModel {
    return this.journey.model;
  }
}
