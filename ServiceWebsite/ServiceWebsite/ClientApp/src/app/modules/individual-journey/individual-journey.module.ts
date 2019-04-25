import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule, Components } from './individual-journey-routing.module';

// services
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualLocalisation } from './services/individual-localisation';

// business logic
import { IndividualJourney } from './individual-journey';

// components
import { UserCameraViewComponent } from './components/user-camera-view/user-camera-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { AudioBarComponent } from './components/audio-bar/audio-bar.component';

// directives/pipes
import { LocalisePipe } from './pipes/localise.pipe';

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
    IndividualJourney
  ]
 })
export class IndividualJourneyModule { }
