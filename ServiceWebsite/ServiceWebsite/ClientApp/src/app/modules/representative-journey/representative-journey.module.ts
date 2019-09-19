import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BaseJourneyModule } from '../base-journey/base-journey.module';
import { RepresentativeJourneyRoutingModule } from './representative-journey-routing.module';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';

// services
import { JOURNEY_FACTORY } from '../base-journey/services/journey.selector';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';

import { RepresentativeSuitabilityModelFactory } from './representative-suitability-model-factory';
import { HearingService, HearingApiService } from './services/hearing.service';
import { RepresentativeNavigationBackFactory } from './representative-navigation-back.factory';

// components
import { YourComputerComponent } from './pages/your-computer/your-computer.component';
import { AnswersSavedComponent } from './pages/answers-saved/answers-saved.component';
import { AppointingABarristerComponent } from './pages/appointing-a-barrister/appointing-a-barrister.component';
import { OtherInformationComponent } from './pages/other-information/other-information.component';
import { YourVideoHearingComponent } from './pages/your-video-hearing/your-video-hearing.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { HearingDetailsHeaderComponent } from './hearing-details-header/hearing-details-header.component';
import { CachedHearingService } from './services/cached-hearing.service';
import { RepresentativeJourneyService } from './services/representative.journey.service';
import { SubmitService } from './services/submit.service';
import { NAVIGATION_BACK_FACTORY } from '../base-journey/services/navigation-back.selector';

@NgModule({
  declarations: [
    YourComputerComponent,
    AnswersSavedComponent,
    ThankYouComponent,
    HearingDetailsHeaderComponent,
    YourVideoHearingComponent,
    AppointingABarristerComponent,
    OtherInformationComponent
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // app
    SharedModule,
    BaseJourneyModule,
    RepresentativeJourneyRoutingModule,
  ],
  providers: [
    { provide: RepresentativeSuitabilityModel, useFactory: RepresentativeSuitabilityModelFactory },
    { provide: JOURNEY_FACTORY, useClass: RepresentativeJourneyFactory, multi: true },
    { provide: HearingService, useFactory: (service: HearingService) => new CachedHearingService(service), deps: [HearingApiService] },
    HearingApiService,
    RepresentativeJourney,
    RepresentativeSuitabilityService,
    RepresentativeJourneyStepComponentBindings,
    JourneyRoutingListenerService,
    RepresentativeSuitabilityService,
    RepresentativeJourneyService,
    SubmitService,
    { provide: NAVIGATION_BACK_FACTORY, useClass: RepresentativeNavigationBackFactory, multi: true },
  ]
})
export class RepresentativeJourneyModule {
}
