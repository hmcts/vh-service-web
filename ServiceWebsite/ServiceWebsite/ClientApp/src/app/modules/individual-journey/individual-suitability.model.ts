import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

export class IndividualSuitabilityModel extends ParticipantSuitabilityModel {
    isCompleted(): boolean {
        return this.selfTest !== undefined && this.selfTest.isCompleted();
    }
}
