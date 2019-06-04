import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../base-journey/components/suitability-choice-page-base.component';
import { IndividualJourney } from '../individual-journey';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

export abstract class SuitabilityChoicePageBaseComponent extends GenericSuitabilityChoicePageBaseComponent {
  constructor(private journey: IndividualJourney) {
    super();
  }

  protected continueJourney() {
    this.journey.next();
  }

  get model(): IndividualSuitabilityModel {
    return this.journey.model;
  }
}
