import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

export abstract class SelfTestModel extends ParticipantSuitabilityModel {
  internet: boolean;
  interpreter: boolean;
  consent: SuitabilityAnswer;
}
