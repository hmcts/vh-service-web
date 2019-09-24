import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { Hearing } from '../base-journey/participant-suitability.model';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
  constructor() {
    super();
  }

  hearing: Hearing;
  participantId: string;
}
