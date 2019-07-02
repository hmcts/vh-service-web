import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class SelfTestJourneySteps extends ParticipantJourneySteps {
  static readonly UseCameraAndMicrophoneAgain = new JourneyStep('UseCameraAndMicrophoneAgain');
  static readonly SameComputer = new JourneyStep('SameComputer');
  static readonly SelfTest = new JourneyStep('SelfTest');
}
