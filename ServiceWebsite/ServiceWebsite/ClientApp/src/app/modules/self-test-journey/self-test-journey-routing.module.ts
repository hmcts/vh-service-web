import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Paths} from './paths';
import {SelfTestComponent} from './pages/self-test/self-test.component';
import {UseCameraMicrophoneAgainComponent} from './pages/use-camera-microphone-again/use-camera-microphone-again.component';
import {SameComputerComponent} from './pages/same-computer/same-computer.component';
import {SignInOtherComputerComponent} from './pages/sign-in-other-computer/sign-in-other-computer.component';
import {CameraWorkingComponent} from './pages/camera-working/camera-working.component';
import {MicrophoneWorkingComponent} from './pages/microphone-working/microphone-working.component';
import {SeeAndHearVideoComponent} from './pages/see-and-hear-video/see-and-hear-video.component';

const routes: Routes = [
  {path: Paths.SameComputer, component: SameComputerComponent},
  {path: Paths.SignInOtherComputer, component: SignInOtherComputerComponent},
  {path: Paths.UseCameraAndMicrophoneAgain, component: UseCameraMicrophoneAgainComponent},
  {path: Paths.SelfTest, component: SelfTestComponent},
  {path: Paths.CameraWorking, component: CameraWorkingComponent},
  {path: Paths.MicrophoneWorking, component: MicrophoneWorkingComponent},
  {path: Paths.SeeAndHearVideo, component: SeeAndHearVideoComponent},
];

export const Components = [
  SameComputerComponent,
  SignInOtherComputerComponent,
  UseCameraMicrophoneAgainComponent,
  SelfTestComponent,
  CameraWorkingComponent,
  MicrophoneWorkingComponent,
  SeeAndHearVideoComponent
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class SelfTestJourneyRoutingModule {
}
