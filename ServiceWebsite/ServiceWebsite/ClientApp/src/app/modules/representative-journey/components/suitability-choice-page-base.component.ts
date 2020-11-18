import { SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent }
    from '../../base-journey/components/suitability-choice-page-base.component';
import { Injectable } from '@angular/core';
import { RepresentativeJourney } from '../representative-journey';
import { ParticipantSuitabilityModel } from '../../base-journey/participant-suitability.model';

@Injectable()
export abstract class SuitabilityChoicePageBaseComponent extends
    GenericSuitabilityChoicePageBaseComponent<RepresentativeJourney> {
    get model(): ParticipantSuitabilityModel {
        return this.journey.model;
    }
}
