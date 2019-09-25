import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class RepresentativeJourneySteps extends ParticipantJourneySteps {
  static readonly YourVideoHearing = new JourneyStep('YourVideoHearing');
  static readonly AppointingABarrister = new JourneyStep('AppointingABarrister');
  static readonly OtherInformation = new JourneyStep('OtherInformation');
  static readonly AnswersSaved = new JourneyStep('AnswersSaved');
}
