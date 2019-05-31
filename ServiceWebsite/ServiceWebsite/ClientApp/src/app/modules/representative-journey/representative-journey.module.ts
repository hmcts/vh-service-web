import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { RepresentativeJourneyRoutingModule } from './representative-journey-routing.module';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { JOURNEY_FACTORY } from '../base-journey/services/journey.selector';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { RepresentativeJourneyRoutingListenerService } from './services/representative-journey-routing-listener.service';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeSuitabilityModelFactory } from './representative-suitability-model-factory';
import { AboutVideoHearingsComponent } from './pages/about-video-hearings/about-video-hearings.component';

@NgModule({
  declarations: [
  AboutVideoHearingsComponent],
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
    RepresentativeStepsOrderFactory
  ]
})
export class RepresentativeJourneyModule {
}
