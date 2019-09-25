import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

export enum AppointingBarrister {
  IAmAppointedBarrister,
  BarristerWillBeAppointed,
  BarristerWillNotBeAppointed
}

export class AppointingBarristerDetails {
  constructor(details?: {
    fullName?: string,
    chambers?: string,
    email?: string
  }) {
    if (details) {
      this.fullName = details.fullName;
      this.chambers = details.chambers;
      this.email = details.email;
    }
  }

  fullName: string;
  chambers: string;
  email: string;
}
/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class RepresentativeSuitabilityModel extends ParticipantSuitabilityModel {
  otherInformation: SuitabilityAnswer;

  appointingBarrister: AppointingBarrister;
  appointingBarristerDetails: AppointingBarristerDetails;

  isCompleted(): boolean {
    const droppedOff = this.computer === false;
    return droppedOff || (this.selfTest !== undefined && this.selfTest.isCompleted());
  }
}
