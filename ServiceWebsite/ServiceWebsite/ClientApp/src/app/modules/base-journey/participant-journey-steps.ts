import { JourneyStep } from '../base-journey/journey-step';

export class ParticipantJourneySteps {
  static readonly  NotStarted = new JourneyStep('NotStarted');
  static readonly  AboutHearings = new JourneyStep('AboutHearings');
  static readonly  AboutYou = new JourneyStep('AboutYou');
  static readonly  AccessToComputer = new JourneyStep('AccessToComputer');
  static readonly  AboutYourComputer = new JourneyStep('AboutYourComputer');
  static readonly  AccessToRoom = new JourneyStep('AccessToRoom');
  static readonly  ThankYou = new JourneyStep('ThankYou');
  static readonly GotoVideoApp = new JourneyStep('GotoVideoApp');
}
