import { IndividualJourneySteps as Steps } from '../individual-journey';
import { Paths } from '../paths';

/**
 * Binds journey steps to components
 */
export class JourneyStepComponentBindings {
    private readonly bindings = new Map<Steps, string>();

    constructor() {
        this.bindings.set(Steps.AccessToRoom, Paths.AboutHearings);
        this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
        this.bindings.set(Steps.AboutYou, Paths.AboutYou);
        this.bindings.set(Steps.AboutHearings, Paths.AboutHearings);
        this.bindings.set(Steps.AccessToCameraAndMicrophone, Paths.UseCameraMicrophone);
        this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
        this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
        this.bindings.set(Steps.Consent, Paths.Consent);
        this.bindings.set(Steps.CourtInformationVideo, Paths.CourtBuildingVideo);
        this.bindings.set(Steps.DifferentHearingTypes, Paths.DifferentHearingTypes);
        this.bindings.set(Steps.ExploreCourtBuilding, Paths.ExploreCourtBuilding);
        this.bindings.set(Steps.HearingAsJudge, Paths.JudgeView);
        this.bindings.set(Steps.HearingAsParticipant, Paths.ParticipantView);
        this.bindings.set(Steps.HelpTheCourtDecide, Paths.HelpTheCourtDecide);
        this.bindings.set(Steps.Interpreter, Paths.Interpreter);
        this.bindings.set(Steps.MediaAccessError, Paths.MediaError);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        this.bindings.set(Steps.YourInternetConnection, Paths.YourInternetConnection);
    }

    /**
     * Returns any step that matches the given route path or null if no matches exist
     * @param route the route url to match with
     */
    getJourneyStep(route: string): Steps {
        // find any binding, if there isn't one, ignore
        for (const [ step, boundPath ] of Array.from(this.bindings.entries())) {
            if (route.toLowerCase() === boundPath.toLowerCase()) {
                return step;
            }
        }

        return null;
    }

    getRoute(step: Steps): string {
        if (!this.bindings.has(step)) {
            throw new Error('Missing route binding for journey step: ' + Steps[step]);
        }

        return this.bindings.get(step);
    }
}
