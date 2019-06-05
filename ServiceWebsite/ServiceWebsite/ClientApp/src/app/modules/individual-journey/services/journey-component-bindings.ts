import { IndividualJourney } from '../individual-journey';
import { IndividualJourneySteps as Steps} from '../individual-journey-steps';
import { Paths } from '../paths';
import { Paths as AppPaths } from '../../../paths';
import { JourneyStep } from '../../base-journey/journey-step';
import { ParticipantJourneyStepComponentBindings } from '../../base-journey/services/participant-journey-component-bindings';

/**
 * Binds journey steps to components
 */
export class JourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
   // readonly bindings = new Map<JourneyStep, string>();

    constructor() {
        super();
        this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
        this.bindings.set(Steps.AboutYou, Paths.AboutYou);
        this.bindings.set(Steps.AboutHearings, Paths.AboutHearings);
        this.bindings.set(Steps.AccessToCameraAndMicrophone, Paths.UseCameraMicrophone);
        this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
        this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
        this.bindings.set(Steps.Consent, Paths.Consent);
        this.bindings.set(Steps.CourtInformationVideo, Paths.CourtBuildingVideo);
        this.bindings.set(Steps.ExploreVideoHearing, Paths.ExploreVideoHearing);
        this.bindings.set(Steps.DifferentHearingTypes, Paths.DifferentHearingTypes);
        this.bindings.set(Steps.ExploreCourtBuilding, Paths.ExploreCourtBuilding);
        this.bindings.set(Steps.HearingAsParticipant, Paths.ParticipantView);
        this.bindings.set(Steps.HelpTheCourtDecide, Paths.HelpTheCourtDecide);
        this.bindings.set(Steps.Interpreter, Paths.Interpreter);
        this.bindings.set(Steps.MediaAccessError, Paths.MediaError);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        this.bindings.set(Steps.YourInternetConnection, Paths.YourInternetConnection);
    }

   }
