import { Config } from './../../shared/models/config';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney, IndividualJourneySteps as Steps } from '../individual-journey';
import { Router, ResolveEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { Paths as AppPaths } from '../../../paths';

/**
 * Connects the routing to the journey
 */
@Injectable()
export class JourneyRoutingListenerService {

    constructor(
        private journey: IndividualJourney,
        private router: Router,
        private bindings: JourneyStepComponentBindings,
        private config: Config,
        private redirect: DocumentRedirectService) {
        journey.redirect.subscribe((step: Steps) => this.gotoStep(step));
    }

    private gotoStep(step: Steps) {
        if (step === Steps.GotoVideoApp) {
            this.redirect.to(this.config.videoAppUrl);
            return;
        }

        const path = this.bindings.getRoute(step);
        this.router.navigate([`/${path}`]);
    }

    private tryJumpJourneyTo(route: string) {
        const step = this.bindings.getJourneyStep(route);

        if (step !== null) {
            this.journey.jumpTo(step);
        } else if (this.isStartRoute(route)) {
            this.journey.jumpTo(this.journey.startStep);
        }
        // Any routes not mapped to steps can be ignored
    }

    private getRouteFromUrl(url: string): string {
        // trim leading slash
        return url.replace(/^\//, '');
    }

    initialise() {
        // begin tracking events, this will also work for the browser-back
        // meaning that it will automagically correct the journey to the right step
        // if the user presses back button
        this.router.events
          .filter(event => event instanceof ResolveEnd)
          .subscribe((event: ResolveEnd) => this.tryJumpJourneyTo(this.getRouteFromUrl(event.url)));

        const currentRoute = this.getRouteFromUrl(this.router.url);
        if (this.isStartRoute(currentRoute)) {
            // since the current route doesn't map to a step, force jump to the start
            this.journey.startAt(this.journey.startStep);
        } else {
            const journeyStep = this.bindings.getJourneyStep(currentRoute);
            if (journeyStep === null) {
                // if we've initialised the journey on some non-journey step, for example, 
                return;
            }
            this.journey.startAt(journeyStep);
        }
    }

    private isStartRoute(route: string): boolean {
        return route === AppPaths.Home;
    }
}
