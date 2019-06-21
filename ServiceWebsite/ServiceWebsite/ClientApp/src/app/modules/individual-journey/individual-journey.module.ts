import { BaseJourneyModule } from './../base-journey/base-journey.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule, Components } from './individual-journey-routing.module';

// services
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualLocalisation } from './services/individual-localisation';
import { MediaService } from './services/media.service';
import { UserMediaService } from './services/user-media.service';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import { BlobVideoStorageService } from './services/blob-video-storage.service';

// business logic
import { IndividualJourney } from './individual-journey';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualSuitabilityModel } from './individual-suitability.model';
import { IndividualSuitabilityModelFactory } from './individual-suitability-model-factory';
import { JOURNEY_FACTORY } from './../base-journey/services/journey.selector';
import { IndividualStepsOrderFactory } from './individual-steps-order.factory';

// components
import { UserCameraViewComponent } from './components/user-camera-view/user-camera-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';

// directives/pipes
import { SuitabilityService } from './services/suitability.service';
import { VideoUrlService } from './services/video-url.service';
import {IndividualJourneyService} from './services/individual-journey.service';

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    BaseJourneyModule,
    IndividualJourneyRoutingModule,
  ],
  declarations: [
    ...Components,
    UserCameraViewComponent,
    VideoViewComponent,
  ],
  providers: [
    { provide: Localisation, useClass: IndividualLocalisation },
    { provide: IndividualSuitabilityModel, useFactory: IndividualSuitabilityModelFactory },
    { provide: MediaService, useClass: UserMediaService },
    { provide: JOURNEY_FACTORY, useClass: IndividualJourneyFactory, multi: true },
    { provide: MediaService, useClass: UserMediaService },
    { provide: VideoUrlService, useClass: BlobVideoStorageService },
    IndividualJourney,
    SuitabilityService,
    JourneyStepComponentBindings,
    JourneyRoutingListenerService,
    SuitabilityService,
    IndividualStepsOrderFactory,
    IndividualJourneyService
  ]
 })
export class IndividualJourneyModule {}
