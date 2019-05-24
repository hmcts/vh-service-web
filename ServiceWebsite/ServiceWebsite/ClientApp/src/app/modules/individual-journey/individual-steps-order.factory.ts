import { Injectable } from '@angular/core';
import { DeviceType } from '../../modules/individual-journey/services/device-type';
import { IndividualJourneySteps } from '../individual-journey/individual-journey-steps';


@Injectable()
export class IndividualStepsOrderFactory {

  constructor(private deviceType: DeviceType) {
  }

  stepOrder(): IndividualJourneySteps[] {
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
        IndividualJourneySteps.ThankYou
      ];
    }
  }

}
