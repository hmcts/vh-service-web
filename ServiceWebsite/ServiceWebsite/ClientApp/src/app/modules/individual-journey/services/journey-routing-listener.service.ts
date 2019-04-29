import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney, IndividualJourneySteps as Steps } from '../individual-journey';
import { Router, ResolveEnd } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Connects the routing to the journey
 */
@Injectable()
export class JourneyRoutingListenerService {

    constructor(private journey: IndividualJourney, private router: Router, private bindings: JourneyStepComponentBindings) {
        journey.redirect.subscribe((step: Steps) => this.gotoStep(step));
    }

    private gotoStep(step: Steps) {
        const path = this.bindings.getRoute(step);
        this.router.navigate([`/${path}`]);
    }

    private enterJourney(url: string) {
        // trim leading slash
        const route = url.replace(/^\//, '');
        const step = this.bindings.getJourneyStep(route);

        // Any routes not mapped to steps can be ignored
        if (step !== null) {
            this.journey.jumpTo(step);
        }
    }

    initialise() {
        // begin tracking events
        this.router.events
          .filter(event => event instanceof ResolveEnd)
          .subscribe((event: ResolveEnd) => this.enterJourney(event.url));
      }
}
