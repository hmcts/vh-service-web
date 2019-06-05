import { Config } from './../../shared/models/config';
import { RepresentativeJourneyStepComponentBindings } from './representative-journey-component-bindings';
import { RepresentativeJourney } from '../representative-journey';
import { RepresentativeJourneySteps as Steps } from '../representative-journey-steps';
import { Router, ResolveEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';

/**
 * Connects the routing to the journey
 */
@Injectable()
export class RepresentativeJourneyRoutingListenerService {

    constructor(
        private journey: RepresentativeJourney,
        private router: Router,
        private bindings: RepresentativeJourneyStepComponentBindings,
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

        if (step === null) {
            // Any routes not mapped to steps can be ignored
            return;
        }

        this.journey.jumpTo(step);
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
            .subscribe((event: ResolveEnd) => this.tryJumpJourneyTo(this.getRouteFromUrl(event.urlAfterRedirects)));

        const currentRoute = this.getRouteFromUrl(this.router.url);
        const journeyStep = this.bindings.getJourneyStep(currentRoute);
        if (journeyStep !== null) {
            this.journey.startAt(journeyStep);
        }
    }
}
