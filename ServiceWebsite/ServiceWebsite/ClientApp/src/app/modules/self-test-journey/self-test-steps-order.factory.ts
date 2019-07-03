import { Injectable } from '@angular/core';
import { DeviceType } from '../base-journey/services/device-type';
import { SelfTestJourneySteps } from './self-test-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';


@Injectable()
export class SelfTestStepsOrderFactory {

  constructor(private deviceType: DeviceType) {
  }

  stepOrder(): JourneyStep[] {
    if (this.deviceType.isMobile()) {
      return [
        SelfTestJourneySteps.SameComputer,
        SelfTestJourneySteps.SignInOtherComputer
      ];
    } else {
      return [
        SelfTestJourneySteps.SameComputer,
        SelfTestJourneySteps.UseCameraAndMicrophoneAgain,
        SelfTestJourneySteps.SelfTest,
        SelfTestJourneySteps.CameraWorking,
        SelfTestJourneySteps.MicrophoneWorking,
        SelfTestJourneySteps.SeeAndHearVideo,
      ];
    }
  }

}
