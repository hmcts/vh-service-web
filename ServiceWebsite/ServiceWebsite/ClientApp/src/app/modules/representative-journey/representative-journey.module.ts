import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BaseJourneyModule } from '../base-journey/base-journey.module';
import { RepresentativeJourneyRoutingModule } from './representative-journey-routing.module';

// services
import { JOURNEY_FACTORY } from '../base-journey/services/journey.selector';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';

import { HearingService, HearingApiService } from '../shared/services/hearing.service';
import { RepresentativeNavigationBackFactory } from './representative-navigation-back.factory';

// components
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { CachedHearingService } from './services/cached-hearing.service';
import { RepresentativeJourneyService } from './services/representative.journey.service';
import { NAVIGATION_BACK_FACTORY } from '../base-journey/services/navigation-back.selector';

@NgModule({
    declarations: [ThankYouComponent],
    imports: [
        // angular
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // app
        SharedModule,
        BaseJourneyModule,
        RepresentativeJourneyRoutingModule
    ],
    providers: [
        { provide: JOURNEY_FACTORY, useClass: RepresentativeJourneyFactory, multi: true },
        { provide: HearingService, useFactory: (service: HearingService) => new CachedHearingService(service), deps: [HearingApiService] },
        HearingApiService,
        RepresentativeJourney,
        RepresentativeJourneyStepComponentBindings,
        JourneyRoutingListenerService,
        RepresentativeJourneyService,
        { provide: NAVIGATION_BACK_FACTORY, useClass: RepresentativeNavigationBackFactory, multi: true }
    ]
})
export class RepresentativeJourneyModule {}
