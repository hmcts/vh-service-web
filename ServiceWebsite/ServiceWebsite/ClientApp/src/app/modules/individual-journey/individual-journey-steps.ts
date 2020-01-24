import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class IndividualJourneySteps extends ParticipantJourneySteps {
  static readonly DifferentHearingTypes = new JourneyStep('DifferentHearingTypes');
  static readonly ExploreCourtBuilding = new JourneyStep('ExploreCourtBuilding');
  static readonly CourtInformationVideo = new JourneyStep('CourtInformationVideo');
  static readonly ExploreVideoHearing = new JourneyStep('ExploreVideoHearing');
  static readonly AccessToCameraAndMicrophone = new JourneyStep('AccessToCameraAndMicrophone');
  static readonly HearingAsParticipant = new JourneyStep('HearingAsParticipant');
  static readonly HelpTheCourtDecide = new JourneyStep('HelpTheCourtDecide');
  static readonly Interpreter = new JourneyStep('Interpreter');
  static readonly YourInternetConnection = new JourneyStep('YourInternetConnection');
  static readonly Consent = new JourneyStep('Consent');
    static readonly AnswersSaved = new JourneyStep('AnswersSaved');
  static readonly MediaAccessError = new JourneyStep('MediaAccessError');
  static GetAll(): JourneyStep[] {
      return [
            this.AboutHearings,
            this.DifferentHearingTypes,
            this.ExploreCourtBuilding,
            this.CourtInformationVideo,
            this.ExploreVideoHearing,
            this.AccessToCameraAndMicrophone,
            this.HearingAsParticipant,
            this.HelpTheCourtDecide,
            this.Interpreter,
            this.YourInternetConnection,
            this.Consent,
            this.MediaAccessError
        ];
    }
}
