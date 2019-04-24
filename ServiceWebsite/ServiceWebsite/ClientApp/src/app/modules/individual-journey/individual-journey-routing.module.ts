import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// directives/pipes
import { LocalisePipe } from './pipes/localise.pipe';

// components
import { AboutHearingsComponent } from './components/about-hearings/about-hearings.component';
import { DifferentHearingTypesComponent } from './components/different-hearing-types/different-hearing-types.component';
import { ExploreCourtBuildingComponent } from './components/explore-court-building/explore-court-building.component';
import { CourtBuildingVideoComponent } from './components/court-building-video/court-building-video.component';
import { ExploreVideoHearingComponent } from './components/explore-video-hearing/explore-video-hearing.component';
import { UseCameraMicrophoneComponent } from './components/use-camera-microphone/use-camera-microphone.component';
import { HearingAsParticipantComponent } from './components/hearing-as-participant/hearing-as-participant.component';
import { HearingAsJudgeComponent } from './components/hearing-as-judge/hearing-as-judge.component';
import { HelpTheCourtDecideComponent } from './components/help-the-court-decide/help-the-court-decide.component';
import { AboutYouComponent } from './components/about-you/about-you.component';
import { InterpreterComponent } from './components/interpreter/interpreter.component';
import { YourComputerComponent } from './components/your-computer/your-computer.component';
import { AboutYourComputerComponent } from './components/about-your-computer/about-your-computer.component';
import { YourInternetConnectionComponent } from './components/your-internet-connection/your-internet-connection.component';
import { AccessToRoomComponent } from './components/access-to-room/access-to-room.component';
import { ConsentComponent } from './components/consent/consent.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const routes: Routes = [
  { path: 'about-hearings', component: AboutHearingsComponent },
  { path: 'different-hearing-types', component: DifferentHearingTypesComponent },
  { path: 'explore-court-building', component: ExploreCourtBuildingComponent },
  { path: 'court-building-video', component: CourtBuildingVideoComponent },
  { path: 'explore-video-hearing', component: ExploreVideoHearingComponent },
  { path: 'use-camera-microphone', component: UseCameraMicrophoneComponent },
  { path: 'participant-view', component: HearingAsParticipantComponent },
  { path: 'judge-view', component: HearingAsJudgeComponent },
  { path: 'help-the-court-decide', component: HelpTheCourtDecideComponent },
  { path: 'about-you', component: AboutYouComponent },
  { path: 'interpreter', component: InterpreterComponent },
  { path: 'your-computer', component: YourComputerComponent },
  { path: 'about-your-computer', component: AboutYourComputerComponent },
  { path: 'your-internet-connection', component: YourInternetConnectionComponent },
  { path: 'access-to-a-room', component: AccessToRoomComponent },
  { path: 'consent', component: ConsentComponent },
  { path: 'thank-you', component: ThankYouComponent }
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
    HearingAsParticipantComponent,
    HearingAsJudgeComponent,
    HelpTheCourtDecideComponent,
    AboutYouComponent,
    InterpreterComponent,
    YourComputerComponent,
    AboutYourComputerComponent,
    YourInternetConnectionComponent,
    AccessToRoomComponent,
    ConsentComponent,
    ThankYouComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class IndividualJourneyRoutingModule {
}
