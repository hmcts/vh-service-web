import { Config } from '../../shared/models/config';
import { ParticipantJourneySteps as Steps } from '../participant-journey-steps';
import { Router, ResolveEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';
import { JourneyStep } from '../journey-step';
import { JourneyBase } from '../journey-base';
import { ParticipantJourneyStepComponentBindings } from './participant-journey-component-bindings';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

/**
 * Connects the routing to the journey
 */
@Injectable()
export class JourneyRoutingListenerService {
    private journey: JourneyBase;
    private componentBindings: ParticipantJourneyStepComponentBindings;

  constructor(
        private location: Location,
        private router: Router,
        private config: Config,
        private redirect: DocumentRedirectService) {
    }

    private gotoStep(step: JourneyStep) {
        if (step === Steps.GotoVideoApp) {
            this.redirect.to(this.config.videoAppUrl);
            return;
        }

        const path = this.componentBindings.getRoute(step);
        this.router.navigate([`/${path}`]);
    }

    private tryJumpJourneyTo(route: string) {
        const step = this.componentBindings.getJourneyStep(route);
        if (step === null) {
            // Any routes not mapped to steps can be ignored
            return;
        }

        // restart the journey if navigating to the first step
        if (step === this.componentBindings.initialStep) {
            this.journey.startAt(step);
        } else {
            this.journey.jumpTo(step);
        }
    }

    private getRouteFromUrl(url: string): string {
        // trim leading slash
        return url.replace(/^\//, '');
    }

  startRouting(componentBindings: ParticipantJourneyStepComponentBindings, journey: JourneyBase) {
        this.journey = journey;
        this.componentBindings = componentBindings;

        // begin tracking events, this will also work for the browser-back
        // meaning that it will automagically correct the journey to the right step
        // if the user presses back button
        this.router.events
          .pipe(filter(event => event instanceof ResolveEnd))
          .subscribe((event: ResolveEnd) => {
            this.tryJumpJourneyTo(this.getRouteFromUrl(event.urlAfterRedirects));
          });

        this.journey.redirect.subscribe((step: JourneyStep) => {
          this.gotoStep(step);
        });
    }

    startJourneyAtCurrentRoute() {
      const currentRoute = this.getRouteFromUrl(this.location.path());
        const journeyStep = this.componentBindings.getJourneyStep(currentRoute);

        if (journeyStep !== null) {
            this.journey.startAt(journeyStep);
        }
    }
}
