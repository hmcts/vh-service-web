import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { Hearing, SuitabilityAnswer } from '../base-journey/participant-suitability.model';
import { OtherInformationComponent } from './pages/other-information/other-information.component';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
  constructor() {
    super();
    this.otherInformation = new SuitabilityAnswer();
  }
  hearing: Hearing;
  participantId: string;
}
