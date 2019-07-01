import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class SelfTestJourneySteps extends ParticipantJourneySteps {
  static readonly First = new JourneyStep('First');
  static readonly Second = new JourneyStep('Second');
  static readonly Dropout = new JourneyStep('Dropout');
}
