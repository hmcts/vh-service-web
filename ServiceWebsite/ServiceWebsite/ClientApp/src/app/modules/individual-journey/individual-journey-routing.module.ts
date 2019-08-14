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
import { VideoViewComponent } from './components/video-view/video-view.component';
import { IndividualGuard } from './individual.gaurd';

const routes: Routes = [
  { path: Paths.AboutHearings, component: AboutHearingsComponent, canActivate: [IndividualGuard] },
  { path: Paths.DifferentHearingTypes, component: DifferentHearingTypesComponent, canActivate: [IndividualGuard] },
  { path: Paths.ExploreCourtBuilding, component: ExploreCourtBuildingComponent, canActivate: [IndividualGuard] },
  { path: Paths.CourtBuildingVideo, component: CourtBuildingVideoComponent, canActivate: [IndividualGuard] },
  { path: Paths.ExploreVideoHearing, component: ExploreVideoHearingComponent, canActivate: [IndividualGuard] },
  { path: Paths.UseCameraMicrophone, component: UseCameraMicrophoneComponent, canActivate: [IndividualGuard] },
  { path: Paths.ParticipantView, component: ParticipantViewComponent, canActivate: [IndividualGuard] },
  { path: Paths.HelpTheCourtDecide, component: HelpTheCourtDecideComponent, canActivate: [IndividualGuard] },
  { path: Paths.AboutYou, component: AboutYouComponent, canActivate: [IndividualGuard] },
  { path: Paths.Interpreter, component: InterpreterComponent, canActivate: [IndividualGuard] },
  { path: Paths.YourComputer, component: YourComputerComponent, canActivate: [IndividualGuard] },
  { path: Paths.AboutYourComputer, component: AboutYourComputerComponent, canActivate: [IndividualGuard] },
  { path: Paths.YourInternetConnection, component: YourInternetConnectionComponent, canActivate: [IndividualGuard] },
  { path: Paths.AccessToRoom, component: AccessToRoomComponent, canActivate: [IndividualGuard] },
  { path: Paths.Consent, component: ConsentComponent, canActivate: [IndividualGuard] },
  { path: Paths.ThankYou, component: ThankYouComponent, canActivate: [IndividualGuard] }
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
