import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class RepresentativeSuitabilityModel extends ParticipantSuitabilityModel {
    aboutYourClient: SuitabilityAnswer;
    clientAttendance: boolean;
    hearingSuitability: SuitabilityAnswer;
}
