import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class RepresentativeJourneySteps extends ParticipantJourneySteps {
    static readonly YourVideoHearing = new JourneyStep('YourVideoHearing');
    static readonly PresentingTheCase = new JourneyStep('PresentingTheCase');

  static readonly OtherInformation = new JourneyStep('OtherInformation');
  static readonly CheckYourAnswers = new JourneyStep('CheckYourAnswers');

  static readonly AnswersSaved = new JourneyStep('AnswersSaved');
}
