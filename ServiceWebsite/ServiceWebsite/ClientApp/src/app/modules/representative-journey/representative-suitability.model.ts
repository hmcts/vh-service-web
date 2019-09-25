import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

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
  otherInformation: boolean;

  appointingBarrister: AppointingBarrister;
  appointingBarristerDetails: AppointingBarristerDetails;

  isCompleted(): boolean {
    return this.selfTest !== undefined && this.selfTest.isCompleted();
  }
}
