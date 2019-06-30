import { Injectable } from '@angular/core';
import { DeviceType } from '../../modules/base-journey/services/device-type';
import { IndividualJourneySteps } from '../individual-journey/individual-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';


@Injectable()
export class IndividualStepsOrderFactory {

  constructor(private deviceType: DeviceType) {
  }

  stepOrder(): JourneyStep[] {
    if (this.deviceType.isMobile()) {
      return [
        IndividualJourneySteps.AboutHearings
      ];
    } else {
      return [
        IndividualJourneySteps.AboutHearings
      ];
    }
  }

}
