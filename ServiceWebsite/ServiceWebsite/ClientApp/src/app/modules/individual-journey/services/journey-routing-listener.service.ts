import { Config } from './../../shared/models/config';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney } from '../individual-journey';
import { IndividualJourneySteps as Steps } from '../individual-journey-steps';
import { Router, ResolveEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { JourneyStep } from '../../base-journey/journey-step';
import { JourneyBase } from '../../base-journey/journey-base';
import { ParticipantJourneyStepComponentBindings } from '../../base-journey/services/participant-journey-component-bindings';

/**
 * Connects the routing to the journey
 */
@Injectable()
export class JourneyRoutingListenerService {

    constructor(
        private journey: JourneyBase,
        private router: Router,
        private bindings: ParticipantJourneyStepComponentBindings,
        private config: Config,
        private redirect: DocumentRedirectService) {
        journey.redirect.subscribe((step: JourneyStep) => this.gotoStep(step));
    }

    private gotoStep(step: JourneyStep) {
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

   

    initialise() {
        // begin tracking events, this will also work for the browser-back
        // meaning that it will automagically correct the journey to the right step
        // if the user presses back button
        this.router.events
          .filter(event => event instanceof ResolveEnd)
          .subscribe((event: ResolveEnd) => this.tryJumpJourneyTo(this.journey.getRouteFromUrl(event.url)));

        const currentRoute = this.journey.getRouteFromUrl(this.router.url);
        const journeyStep = this.bindings.getJourneyStep(currentRoute);
        if (journeyStep !== null) {
            this.journey.startAt(journeyStep);
        }
    }
}
