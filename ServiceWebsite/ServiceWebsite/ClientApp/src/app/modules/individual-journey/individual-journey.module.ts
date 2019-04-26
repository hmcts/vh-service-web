import { JourneyRoutingListenerService } from './services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule, Components } from './individual-journey-routing.module';

// services
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualLocalisation } from './services/individual-localisation';
import { IndividualSuitabilityModel } from './individual-suitability.model';
import { IndividualSuitabilityModelFactory } from './individual-suitability-model-factory';
import { MediaAccessService } from './services/media-access.service';

// business logic
import { IndividualJourney } from './individual-journey';

// components
import { UserCameraViewComponent } from './components/user-camera-view/user-camera-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { AudioBarComponent } from './components/audio-bar/audio-bar.component';

// directives/pipes
import { LocalisePipe } from './pipes/localise.pipe';

// Temporary mock
export class MediaAccessMock implements MediaAccessService {
  requestAccess(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    IndividualJourneyRoutingModule,
  ],
  declarations: [
    ...Components,
    AudioBarComponent,
    UserCameraViewComponent,
    VideoViewComponent,
    LocalisePipe
  ],
  providers: [
    { provide: Localisation, useClass: IndividualLocalisation },
    { provide: IndividualSuitabilityModel, useFactory: IndividualSuitabilityModelFactory },
    { provide: MediaAccessService, useClass: MediaAccessMock },
    IndividualJourney,
    JourneyStepComponentBindings,
    JourneyRoutingListenerService
  ]
 })
export class IndividualJourneyModule {
  constructor(service: JourneyRoutingListenerService) {
    // this makes sure the binder is created and listens to routing events,
    // unless we use it somewhere it would not get instantiated
    service.initialise();
  }
}
