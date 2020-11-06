/// <reference path="individual-suitability.model.ts" />
import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

export class IndividualJourneySteps extends ParticipantJourneySteps {
    static GetAll(): JourneyStep[] {
        return [this.AboutHearings];
    }
}
