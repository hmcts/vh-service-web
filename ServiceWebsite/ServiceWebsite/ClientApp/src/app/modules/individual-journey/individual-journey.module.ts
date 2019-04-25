import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule } from './individual-journey-routing.module';

// services
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualLocalisation } from './services/individual-localisation';

// business logic
import { IndividualJourney } from './individual-journey';

// components
import { UserCameraViewComponent } from './components/user-camera-view/user-camera-view.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { AudioBarComponent } from './components/audio-bar/audio-bar.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { MediaAccessService } from './services/media-access.service';

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
    AudioBarComponent,
    UserCameraViewComponent,
    VideoViewComponent,
    ContactUsComponent
   ],
  providers: [
    { provide: Localisation, useClass: IndividualLocalisation },

    {provide: MediaAccessService, useValue: {requestAccess:()=>{return Promise.resolve(true)}}},

    IndividualJourney

  ]
 })
export class IndividualJourneyModule { }
