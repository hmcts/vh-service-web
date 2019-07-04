import { Injectable } from '@angular/core';
import { DeviceType } from '../base-journey/services/device-type';
import { IndividualJourneySteps } from '../individual-journey/individual-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';


@Injectable()
export class IndividualStepsOrderFactory {

  constructor(private deviceType: DeviceType) {
  }

  stepOrder(): JourneyStep[] {
    if (this.deviceType.isMobile()) {
      return [
        IndividualJourneySteps.AboutHearings,
        IndividualJourneySteps.DifferentHearingTypes,
        IndividualJourneySteps.ExploreCourtBuilding,
        IndividualJourneySteps.CourtInformationVideo,
        IndividualJourneySteps.ExploreVideoHearing,
        IndividualJourneySteps.HearingAsParticipant,
        IndividualJourneySteps.HelpTheCourtDecide,
        IndividualJourneySteps.AboutYou,
        IndividualJourneySteps.Interpreter,
        IndividualJourneySteps.AccessToComputer,
        IndividualJourneySteps.AboutYourComputer,
        IndividualJourneySteps.YourInternetConnection,
        IndividualJourneySteps.AccessToRoom,
        IndividualJourneySteps.Consent,
        IndividualJourneySteps.ThankYou
      ];
    } else {
      return [
        IndividualJourneySteps.AboutHearings,
        IndividualJourneySteps.DifferentHearingTypes,
        IndividualJourneySteps.ExploreCourtBuilding,
        IndividualJourneySteps.CourtInformationVideo,
        IndividualJourneySteps.ExploreVideoHearing,
        IndividualJourneySteps.AccessToCameraAndMicrophone,
        IndividualJourneySteps.HearingAsParticipant,
        IndividualJourneySteps.HelpTheCourtDecide,
        IndividualJourneySteps.AboutYou,
        IndividualJourneySteps.Interpreter,
        IndividualJourneySteps.AccessToComputer,
        IndividualJourneySteps.AboutYourComputer,
        IndividualJourneySteps.YourInternetConnection,
        IndividualJourneySteps.AccessToRoom,
        IndividualJourneySteps.Consent,
        SelfTestJourneySteps.SameComputer,
        SelfTestJourneySteps.UseCameraAndMicrophoneAgain,
        SelfTestJourneySteps.SelfTest,
        SelfTestJourneySteps.CameraWorking,
        SelfTestJourneySteps.MicrophoneWorking,
        SelfTestJourneySteps.SeeAndHearVideo,
        IndividualJourneySteps.ThankYou
      ];
    }
  }

}
