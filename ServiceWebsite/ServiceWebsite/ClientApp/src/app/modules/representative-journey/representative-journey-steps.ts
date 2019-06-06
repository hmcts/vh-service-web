import { JourneyStep } from '../base-journey/journey-step';

export class RepresentativeJourneySteps {
  static readonly NotStarted = new JourneyStep('NotStarted'); //
  static readonly AboutVideoHearings = new JourneyStep('AboutVideoHearings');
  static readonly AboutYouAndYourClient = new JourneyStep('AboutYouAndYourClient');
  static readonly AboutYou = new JourneyStep('AboutYou');
  static readonly AccessToRoom = new JourneyStep('AccessToRoom');
  static readonly AboutYourClient = new JourneyStep('AboutYourClient');
  static readonly ClientAttendance = new JourneyStep('ClientAttendance');
  static readonly HearingSuitability = new JourneyStep('HearingSuitability');
  static readonly AccessToComputer = new JourneyStep('AccessToComputer');
  static readonly AboutYourComputer = new JourneyStep('AboutYourComputer');
  static readonly QuestionnaireCompleted = new JourneyStep('QuestionnaireCompleted');
  static readonly ThankYou = new JourneyStep('ThankYou');
  static readonly ContactUs = new JourneyStep('ContactUs');
  static readonly GotoVideoApp = new JourneyStep('GotoVideoApp');
}
