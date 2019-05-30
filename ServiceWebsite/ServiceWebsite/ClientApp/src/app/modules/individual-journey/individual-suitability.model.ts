import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class IndividualSuitabilityModel extends ParticipantSuitabilityModel {
    internet: boolean;
    interpreter: boolean;
    consent: SuitabilityAnswer;
}
