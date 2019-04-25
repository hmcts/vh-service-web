import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// directives/pipes
import { LocalisePipe } from './pipes/localise.pipe';

// components
import { AboutHearingsComponent } from './pages/about-hearings/about-hearings.component';
import { DifferentHearingTypesComponent } from './pages/different-hearing-types/different-hearing-types.component';
import { ExploreCourtBuildingComponent } from './pages/explore-court-building/explore-court-building.component';
import { CourtBuildingVideoComponent } from './pages/court-building-video/court-building-video.component';
import { ExploreVideoHearingComponent } from './pages/explore-video-hearing/explore-video-hearing.component';
import { UseCameraMicrophoneComponent } from './pages/use-camera-microphone/use-camera-microphone.component';
import { ParticipantViewComponent } from './pages/participant-view/participant-view.component';
import { JudgeViewComponent } from './pages/judge-view/judge-view.component';
import { HelpTheCourtDecideComponent } from './pages/help-the-court-decide/help-the-court-decide.component';
import { AboutYouComponent } from './pages/about-you/about-you.component';
import { InterpreterComponent } from './pages/interpreter/interpreter.component';
import { YourComputerComponent } from './pages/your-computer/your-computer.component';
import { AboutYourComputerComponent } from './pages/about-your-computer/about-your-computer.component';
import { YourInternetConnectionComponent } from './pages/your-internet-connection/your-internet-connection.component';
import { AccessToRoomComponent } from './pages/access-to-room/access-to-room.component';
import { ConsentComponent } from './pages/consent/consent.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { MediaErrorComponent } from './pages/media-error/media-error.component';

const routes: Routes = [
  { path: 'about-hearings', component: AboutHearingsComponent },
  { path: 'different-hearing-types', component: DifferentHearingTypesComponent },
  { path: 'explore-court-building', component: ExploreCourtBuildingComponent },
  { path: 'court-building-video', component: CourtBuildingVideoComponent },
  { path: 'explore-video-hearing', component: ExploreVideoHearingComponent },
  { path: 'use-camera-microphone', component: UseCameraMicrophoneComponent },
  { path: 'participant-view', component: ParticipantViewComponent },
  { path: 'judge-view', component: JudgeViewComponent },
  { path: 'help-the-court-decide', component: HelpTheCourtDecideComponent },
  { path: 'about-you', component: AboutYouComponent },
  { path: 'interpreter', component: InterpreterComponent },
  { path: 'your-computer', component: YourComputerComponent },
  { path: 'about-your-computer', component: AboutYourComputerComponent },
  { path: 'your-internet-connection', component: YourInternetConnectionComponent },
  { path: 'access-to-a-room', component: AccessToRoomComponent },
  { path: 'consent', component: ConsentComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'media-error', component: MediaErrorComponent }
];

@NgModule({
  declarations: [
    LocalisePipe,
    AboutHearingsComponent,
    DifferentHearingTypesComponent,
    ExploreCourtBuildingComponent,
    CourtBuildingVideoComponent,
    ExploreVideoHearingComponent,
    UseCameraMicrophoneComponent,
  //  ParticipantViewComponent,
    JudgeViewComponent,
    HelpTheCourtDecideComponent,
    AboutYouComponent,
    InterpreterComponent,
    YourComputerComponent,
    AboutYourComputerComponent,
    YourInternetConnectionComponent,
    AccessToRoomComponent,
    ConsentComponent,
    ThankYouComponent,
    MediaErrorComponent
  ],
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class IndividualJourneyRoutingModule {
}
