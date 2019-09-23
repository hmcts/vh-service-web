import { HasAccessToCamera } from '../base-journey/participant-suitability.model';
import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class RepresentativeSuitabilityModel extends ParticipantSuitabilityModel {
    otherInformation: boolean;

    isCompleted(): boolean {
        const droppedOff = this.camera === HasAccessToCamera.No || this.computer === false;
        return droppedOff || (this.selfTest !== undefined && this.selfTest.isCompleted());
    }
}
