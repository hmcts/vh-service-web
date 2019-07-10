import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Paths} from './paths';
import {SelfTestComponent} from './pages/self-test/self-test.component';
import {SwitchOnCameraAndMicrophoneComponent} from './pages/switch-on-camera-and-microphone/switch-on-camera-and-microphone.component';
import {CheckYourComputerComponent} from './pages/check-your-computer/check-your-computer.component';
import {SignInOnComputerComponent} from './pages/sign-in-on-computer/sign-in-on-computer.component';
import {SignBackInComponent} from './pages/sign-back-in/sign-back-in.component';
import {CameraWorkingComponent} from './pages/camera-working/camera-working.component';
import {MicrophoneWorkingComponent} from './pages/microphone-working/microphone-working.component';
import {SeeAndHearVideoComponent} from './pages/see-and-hear-video/see-and-hear-video.component';

const routes: Routes = [
  {path: Paths.CheckYourComputer, component: CheckYourComputerComponent},
  {path: Paths.SignBackIn, component: SignBackInComponent},
  {path: Paths.SignInOnComputer, component: SignInOnComputerComponent},
  {path: Paths.SwitchOnCameraAndMicrophone, component: SwitchOnCameraAndMicrophoneComponent},
  {path: Paths.SelfTest, component: SelfTestComponent},
  {path: Paths.CameraWorking, component: CameraWorkingComponent},
  {path: Paths.MicrophoneWorking, component: MicrophoneWorkingComponent},
  {path: Paths.SeeAndHearVideo, component: SeeAndHearVideoComponent},
];

export const Components = [
  CheckYourComputerComponent,
  SignBackInComponent,
  SignInOnComputerComponent,
  SwitchOnCameraAndMicrophoneComponent,
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
