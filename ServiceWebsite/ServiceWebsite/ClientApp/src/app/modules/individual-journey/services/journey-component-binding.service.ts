import { IndividualJourney, IndividualJourneySteps as Steps } from '../individual-journey';
import { Router } from '@angular/router';
import { Paths } from '../paths';

/**
 * Responsible for routing the journey steps to components
 */
export class JourneyComponentBindingsService {
    private readonly bindings = new Map<Steps, string>();

    constructor(private router: Router, journey: IndividualJourney) {
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

        journey.redirect.subscribe((step: Steps) => this.gotoStep(step));
    }

    private gotoStep(step: Steps) {
        if (!this.bindings.has(step)) {
            throw new Error(`Missing component binding for step: ${Steps[step]}`);
        }

        this.router.navigate([this.bindings[step]]);
    }

    /**
     * Enter the journey at a given route
     * @param path The route we enter the ourney at
     */
    public enter(path: string) {
        for (const [ step, boundPath ] of Array.from(this.bindings.entries())) {
            if (path.toLowerCase() === boundPath.toLowerCase()) {
                return step;
            }
        }

        throw new Error(`Could not find a journey step binding for path: ${path}`);
    }
}
