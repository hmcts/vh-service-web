import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class RepresentativeJourneySteps extends ParticipantJourneySteps {
  static readonly AboutVideoHearings = new JourneyStep('AboutVideoHearings');
  static readonly AboutYouAndYourClient = new JourneyStep('AboutYouAndYourClient');
  static readonly AboutYourClient = new JourneyStep('AboutYourClient');
  static readonly ClientAttendance = new JourneyStep('ClientAttendance');
  static readonly HearingSuitability = new JourneyStep('HearingSuitability');
  static readonly AnswersSaved = new JourneyStep('AnswersSaved');
}
