import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class IndividualJourneySteps extends ParticipantJourneySteps {
  static readonly DifferentHearingTypes = new JourneyStep('DifferentHearingTypes');
  static readonly Interpreter = new JourneyStep('Interpreter');
  static readonly YourInternetConnection = new JourneyStep('YourInternetConnection');
  static readonly Consent = new JourneyStep('Consent');
    static readonly AnswersSaved = new JourneyStep('AnswersSaved');
  static readonly MediaAccessError = new JourneyStep('MediaAccessError');
  static GetAll(): JourneyStep[] {
      return [
            this.AboutHearings,
            this.DifferentHearingTypes,
            this.Interpreter,
            this.YourInternetConnection,
            this.Consent,
            this.MediaAccessError
        ];
    }
}
