import { HearingService } from './services/hearing.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { RepresentativeJourneyRoutingModule } from './representative-journey-routing.module';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';

// services
import { JOURNEY_FACTORY } from '../base-journey/services/journey.selector';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { RepresentativeJourneyRoutingListenerService } from './services/representative-journey-routing-listener.service';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeSuitabilityModelFactory } from './representative-suitability-model-factory';

// components
import { AboutVideoHearingsComponent } from './pages/about-video-hearings/about-video-hearings.component';
import { AboutYouAndYourClientComponent } from './pages/about-you-and-your-client/about-you-and-your-client.component';
import { AboutYouComponent } from './pages/about-you/about-you.component';
import { AccessToRoomComponent } from './pages/access-to-room/access-to-room.component';
import { AboutYourClientComponent } from './pages/about-your-client/about-your-client.component';
import { ClientAttendanceComponent } from './pages/client-attendance/client-attendance.component';
import { HearingSuitabilityComponent } from './pages/hearing-suitability/hearing-suitability.component';
import { YourComputerComponent } from './pages/your-computer/your-computer.component';
import { QuestionnaireCompletedComponent } from './pages/questionnaire-completed/questionnaire-completed.component';
import { AboutYourComputerComponent } from './pages/about-your-computer/about-your-computer.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { PleaseContactUsComponent } from './pages/please-contact-us/please-contact-us.component';
import { HearingDetailsHeaderComponent } from './hearing-details-header/hearing-details-header.component';

@NgModule({
  declarations: [
    AboutVideoHearingsComponent,
    AboutYouAndYourClientComponent,
    AboutYouComponent,
    AccessToRoomComponent,
    AboutYourClientComponent,
    ClientAttendanceComponent,
    HearingSuitabilityComponent,
    YourComputerComponent,
    QuestionnaireCompletedComponent,
    AboutYourComputerComponent,
    ThankYouComponent,
    PleaseContactUsComponent,
    HearingDetailsHeaderComponent
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // app
    SharedModule,
    RepresentativeJourneyRoutingModule,
  ],
  providers: [
    { provide: RepresentativeSuitabilityModel, useFactory: RepresentativeSuitabilityModelFactory },
    { provide: JOURNEY_FACTORY, useClass: RepresentativeJourneyFactory, multi: true },
    RepresentativeJourney,
    RepresentativeSuitabilityService,
    RepresentativeJourneyStepComponentBindings,
    RepresentativeJourneyRoutingListenerService,
    RepresentativeSuitabilityService,
    RepresentativeStepsOrderFactory,
    HearingService
  ]
})
export class RepresentativeJourneyModule {
}
