import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class RepresentativeJourneySteps extends ParticipantJourneySteps {
  //Old steps
  static readonly AboutVideoHearings = new JourneyStep('AboutVideoHearings');
  static readonly AboutYouAndYourClient = new JourneyStep('AboutYouAndYourClient');
  static readonly AboutYourClient = new JourneyStep('AboutYourClient');
  static readonly ClientAttendance = new JourneyStep('ClientAttendance');
  static readonly HearingSuitability = new JourneyStep('HearingSuitability');
  static readonly YourVideoHearing = new JourneyStep('YourVideoHearing');
  static readonly AppointingABarrister = new JourneyStep('AppointingABarrister');
  static readonly OtherInformation = new JourneyStep('OtherInformation');
  static readonly AnswersSaved = new JourneyStep('AnswersSaved');
}
