import { IndividualJourney, IndividualJourneySteps as Steps } from '../individual-journey';
import { Router } from '@angular/router';

/**
 * Connects the routing to the journey
 */
export class JourneyRoutingListenerService {

    constructor(private journey: IndividualJourney, private router: Router, private bindings: JourneyStepComponentBindings) {
        journey.redirect.subscribe((step: Steps) => this.gotoStep(step));
    }

    private gotoStep(step: Steps) {
        if (!this.bindings.has(step)) {
            throw new Error(`Missing component binding for step: ${Steps[step]}`);
        }

        const path = this.bindings.get(step);
        this.router.navigate([path]);
    }

    /**
     * Enter the journey at a given route
     * @param path The route we enter the journey at
     */
    private enterJourney(path: string) {
        // find any binding, if there isn't one, ignore
        for (const [ step, boundPath ] of Array.from(this.bindings.entries())) {
            if (path.toLowerCase() === boundPath.toLowerCase()) {
                this.journey.jumpTo(step);
                return;
            }
        }
    }

    initialise() {
        // begin tracking events
        this.router.events
          .filter(event => event instanceof ResolveEnd)
          .subscribe((event: ResolveEnd) => this.enterJourney(event.url.replace(/^\//, '')));
      }
}