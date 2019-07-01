import { Injectable } from '@angular/core';
import { DeviceType } from '../../modules/base-journey/services/device-type';
import { SelfTestJourneySteps } from './self-test-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';


@Injectable()
export class SelfTestStepsOrderFactory {

  constructor(private deviceType: DeviceType) {
  }

  stepOrder(): JourneyStep[] {
    if (this.deviceType.isMobile()) {
      return [
        SelfTestJourneySteps.First,
        SelfTestJourneySteps.Dropout
      ];
    } else {
      return [
        SelfTestJourneySteps.First,
        SelfTestJourneySteps.Dropout
      ];
    }
  }

}
