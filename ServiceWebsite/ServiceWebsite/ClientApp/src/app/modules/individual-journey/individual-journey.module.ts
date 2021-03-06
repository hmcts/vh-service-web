import { BaseJourneyModule } from '../base-journey/base-journey.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule, Components } from './individual-journey-routing.module';

// services
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';

// business logic
import { IndividualJourney } from './individual-journey';
import { IndividualJourneyFactory } from './individual-journey.factory';

import { JOURNEY_FACTORY } from '../base-journey/services/journey.selector';
import { IndividualNavigationBackFactory } from './individual-navigation-back.factory';
import { NAVIGATION_BACK_FACTORY } from '../base-journey/services/navigation-back.selector';

// directives/pipes
import { IndividualJourneyService } from './services/individual-journey.service';
import { MediaService } from 'src/app/services/media.service';
import { UserMediaService } from 'src/app/services/user-media.service';

@NgModule({
    imports: [
        // angular
        CommonModule,
        ReactiveFormsModule,
        FormsModule,

        // app
        SharedModule,
        BaseJourneyModule,
        IndividualJourneyRoutingModule
    ],
    declarations: [...Components],
    providers: [
        { provide: MediaService, useClass: UserMediaService },
        { provide: JOURNEY_FACTORY, useClass: IndividualJourneyFactory, multi: true },
        IndividualJourney,
        JourneyStepComponentBindings,
        JourneyRoutingListenerService,
        IndividualJourneyService,
        { provide: NAVIGATION_BACK_FACTORY, useClass: IndividualNavigationBackFactory, multi: true }
    ]
})
export class IndividualJourneyModule {}
