import { RepresentativeJourney } from '../representative-journey';
import { RepresentativeJourneySteps as Steps } from '../representative-journey-steps';
import { Paths } from '../../representative-journey/paths';
import { Paths as AppPaths } from '../../../paths';

/**
 * Binds journey steps to components
 */
export class RepresentativeJourneyStepComponentBindings {
    private readonly bindings = new Map<Steps, string>();

    constructor() {
        this.bindings.set(Steps.AboutVideoHearings, Paths.AboutVideoHearings);
        this.bindings.set(Steps.AboutYouAndYourClient, Paths.AboutYouAndYourClient);
        this.bindings.set(Steps.AboutYou, Paths.AboutYou);
        this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
        this.bindings.set(Steps.AboutYourClient, Paths.AboutYourClient);
        this.bindings.set(Steps.ClientAttendance, Paths.ClientAttendance);
        this.bindings.set(Steps.HearingSuitability, Paths.HearingSuitability);
        this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
        this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
        this.bindings.set(Steps.QuestionnaireCompleted, Paths.QuestionnaireCompleted);
        this.bindings.set(Steps.ContactUs, Paths.ContactUs);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
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

        if (route === AppPaths.Home) {
            return RepresentativeJourney.initialStep;
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
