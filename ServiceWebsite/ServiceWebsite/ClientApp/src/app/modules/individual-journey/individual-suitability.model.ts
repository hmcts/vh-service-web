import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

export enum HasAccessToCamera {
  Yes,
  No,
  NotSure
}

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class IndividualSuitabilityModel extends ParticipantSuitabilityModel {
  aboutYou: SuitabilityAnswer;
  internet: boolean;
  interpreter: boolean;
  consent: SuitabilityAnswer;
  mediaAccepted: boolean;
  camera: HasAccessToCamera;
  room: boolean;
  computer: boolean;

  isCompleted(): boolean {
    const droppedOff = this.camera === HasAccessToCamera.No
      || this.computer === false
      || this.internet === false
      || this.consent.answer === false;
    return droppedOff || (this.selfTest !== undefined && this.selfTest.isCompleted());
  }
}
