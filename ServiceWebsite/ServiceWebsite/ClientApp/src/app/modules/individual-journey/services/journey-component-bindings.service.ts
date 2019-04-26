import { IndividualJourney, IndividualJourneySteps } from '../individual-journey';
import { Router } from '@angular/router';

/**
 * Responsible for routing the journey steps to components
 */
export class JourneyComponentBindingsService {
    private readonly bindings = new Map<IndividualJourneySteps, string>();

    constructor(private router: Router, journey: IndividualJourney) {
        journey.redirect.subscribe((step: IndividualJourneySteps) => this.gotoStep(step));
    }

    private gotoStep(step: IndividualJourneySteps) {
        if (!this.bindings.has(step)) {
            throw new Error(`Missing component binding for step: ${IndividualJourneySteps[step]}`);
        }
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
