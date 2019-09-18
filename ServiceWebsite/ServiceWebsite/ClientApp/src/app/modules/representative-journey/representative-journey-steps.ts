import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class RepresentativeJourneySteps extends ParticipantJourneySteps {
  static readonly AnswersSaved = new JourneyStep('AnswersSaved');
}
