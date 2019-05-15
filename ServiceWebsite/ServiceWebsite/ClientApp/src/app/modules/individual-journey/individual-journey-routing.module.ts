import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

// components
import { AboutHearingsComponent } from './pages/about-hearings/about-hearings.component';
import { DifferentHearingTypesComponent } from './pages/different-hearing-types/different-hearing-types.component';
import { ExploreCourtBuildingComponent } from './pages/explore-court-building/explore-court-building.component';
import { CourtBuildingVideoComponent } from './pages/court-building-video/court-building-video.component';
import { ExploreVideoHearingComponent } from './pages/explore-video-hearing/explore-video-hearing.component';
import { UseCameraMicrophoneComponent } from './pages/use-camera-microphone/use-camera-microphone.component';
import { ParticipantViewComponent } from './pages/participant-view/participant-view.component';
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
import { VideoViewComponent } from './components/video-view/video-view.component';

const routes: Routes = [
  { path: Paths.AboutHearings, component: AboutHearingsComponent },
  { path: Paths.DifferentHearingTypes, component: DifferentHearingTypesComponent },
  { path: Paths.ExploreCourtBuilding, component: ExploreCourtBuildingComponent },
  { path: Paths.CourtBuildingVideo, component: CourtBuildingVideoComponent },
  { path: Paths.ExploreVideoHearing, component: ExploreVideoHearingComponent },
  { path: Paths.UseCameraMicrophone, component: UseCameraMicrophoneComponent },
  { path: Paths.ParticipantView, component: ParticipantViewComponent },
  { path: Paths.HelpTheCourtDecide, component: HelpTheCourtDecideComponent },
  { path: Paths.AboutYou, component: AboutYouComponent },
  { path: Paths.Interpreter, component: InterpreterComponent },
  { path: Paths.YourComputer, component: YourComputerComponent },
  { path: Paths.AboutYourComputer, component: AboutYourComputerComponent },
  { path: Paths.YourInternetConnection, component: YourInternetConnectionComponent },
  { path: Paths.AccessToRoom, component: AccessToRoomComponent },
  { path: Paths.Consent, component: ConsentComponent },
  { path: Paths.ThankYou, component: ThankYouComponent },
  { path: Paths.MediaError, component: MediaErrorComponent }
];

// Export all components loaded so these can be declared in parent module
export const Components = [
  AboutHearingsComponent,
  DifferentHearingTypesComponent,
  ExploreCourtBuildingComponent,
  CourtBuildingVideoComponent,
  ExploreVideoHearingComponent,
  UseCameraMicrophoneComponent,
  ParticipantViewComponent,
  HelpTheCourtDecideComponent,
  AboutYouComponent,
  InterpreterComponent,
  YourComputerComponent,
  AboutYourComputerComponent,
  YourInternetConnectionComponent,
  AccessToRoomComponent,
  ConsentComponent,
  ThankYouComponent,
  MediaErrorComponent,
  VideoViewComponent
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class IndividualJourneyRoutingModule { }
