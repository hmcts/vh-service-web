import { JourneyStep } from '../base-journey/journey-step';

export class IndividualJourneySteps {
  static readonly  NotStarted = new JourneyStep('NotStarted');
  static readonly  AboutHearings = new JourneyStep('AboutHearings');
  static readonly  DifferentHearingTypes = new JourneyStep('DifferentHearingTypes');
  static readonly  ExploreCourtBuilding = new JourneyStep('ExploreCourtBuilding');
  static readonly  CourtInformationVideo = new JourneyStep('CourtInformationVideo');
  static readonly  ExploreVideoHearing = new JourneyStep('ExploreVideoHearing');
  static readonly  AccessToCameraAndMicrophone = new JourneyStep('AccessToCameraAndMicrophone');
  static readonly  HearingAsParticipant = new JourneyStep('HearingAsParticipant');
  static readonly  HelpTheCourtDecide = new JourneyStep('HelpTheCourtDecide');
  static readonly  AboutYou = new JourneyStep('AboutYou');
  static readonly  Interpreter = new JourneyStep('Interpreter');
  static readonly  AccessToComputer = new JourneyStep('AccessToComputer');
  static readonly  AboutYourComputer = new JourneyStep('AboutYourComputer');
  static readonly  YourInternetConnection = new JourneyStep('YourInternetConnection');
  static readonly  AccessToRoom = new JourneyStep('AccessToRoom');
  static readonly  Consent = new JourneyStep('Consent');
  static readonly  ThankYou = new JourneyStep('ThankYou');
  static readonly  MediaAccessError = new JourneyStep('MediaAccessError');
  static readonly  GotoVideoApp = new JourneyStep('GotoVideoApp');
}
