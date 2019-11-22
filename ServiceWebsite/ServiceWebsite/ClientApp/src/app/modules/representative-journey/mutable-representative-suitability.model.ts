import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { Hearing, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
  constructor() {
    super();
    this.otherInformation = new SuitabilityAnswer();
  }
  hearing: Hearing;
  participantId: string;
}
