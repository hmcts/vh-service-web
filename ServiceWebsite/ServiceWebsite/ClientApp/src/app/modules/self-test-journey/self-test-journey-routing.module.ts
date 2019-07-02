import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Paths} from './paths';
import {SelfTestComponent} from './pages/self-test/self-test.component';
import {UseCameraMicrophoneAgainComponent} from './pages/use-camera-microphone-again/use-camera-microphone-again.component';
import {SameComputerComponent} from './pages/same-computer/same-computer.component';
import {SignInOtherComputerComponent} from './pages/sign-in-other-computer/sign-in-other-computer.component';

const routes: Routes = [
  {path: Paths.SameComputer, component: SameComputerComponent},
  {path: Paths.SignInOtherComputer, component: SignInOtherComputerComponent},
  {path: Paths.UseCameraAndMicrophoneAgain, component: UseCameraMicrophoneAgainComponent},
  {path: Paths.SelfTest, component: SelfTestComponent},
];

export const Components = [
  SameComputerComponent,
  SignInOtherComputerComponent,
  UseCameraMicrophoneAgainComponent,
  SelfTestComponent
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
