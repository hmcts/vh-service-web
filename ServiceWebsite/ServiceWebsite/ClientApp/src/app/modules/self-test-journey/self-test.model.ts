import { ParticipantSuitabilityModel} from '../base-journey/participant-suitability.model';

export class SelfTestModel extends ParticipantSuitabilityModel {
  internet: boolean;
  interpreter: boolean;
}
