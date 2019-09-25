import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { Hearing } from '../base-journey/participant-suitability.model';
import { OtherInformationComponent } from './pages/other-information/other-information.component';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
  constructor() {
    super();
  }
  hearing: Hearing;
  participantId: string;
}
