import {RepresentativeSuitabilityModel} from './representative-suitability.model';
import {HasAccessToCamera, Hearing} from '../base-journey/participant-suitability.model';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
  constructor() {
    super();
  }

  camera: HasAccessToCamera;
  hearing: Hearing;
  participantId: string;
}
