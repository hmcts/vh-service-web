import { IndividualSuitabilityModel, HasAccessToCamera} from './individual-suitability.model';
import {SuitabilityAnswer, Hearing} from '../base-journey/participant-suitability.model';

export class MutableIndividualSuitabilityModel extends IndividualSuitabilityModel {
  constructor() {
    super();
    this.aboutYou = new SuitabilityAnswer();
    this.consent = new SuitabilityAnswer();
  }

  mediaAccepted: boolean;
  camera: HasAccessToCamera;
  computer: boolean;
  internet: boolean;
  interpreter: boolean;
  room: boolean;
  aboutYou: SuitabilityAnswer;
  consent: SuitabilityAnswer;
  hearing: Hearing;
  participantId: string;
}
