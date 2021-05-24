import { Paths as AppPaths } from '../../../paths';
import { JourneyStep } from '../journey-step';

/**
 * Binds journey steps to components
 */
export abstract class ParticipantJourneyStepComponentBindings {
    readonly bindings = new Map<JourneyStep, string>();
    readonly initialStep;
    readonly finalStep;

    /**
     * Returns any step that matches the given route path or null if no matches exist
     * @param route the route url to match with
     */
    getJourneyStep(route: string): JourneyStep {
        // find any binding, if there isn't one, ignore
        for (const [step, boundPath] of Array.from(this.bindings.entries())) {
            if (route.toLowerCase() === boundPath.toLowerCase()) {
                return step;
            }
        }

        if (route === AppPaths.JourneySelector) {
            return this.initialStep;
        }

        return null;
    }

    getRoute(step: JourneyStep): string {
        if (!this.bindings.has(step)) {
            throw new Error('Missing route binding for journey step: ' + step);
        }

        return this.bindings.get(step);
    }
}
