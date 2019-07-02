import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Paths} from './paths';
import {SelfTestComponent} from './pages/self-test/self-test.component';
import {UseCameraMicrophoneAgainComponent} from './pages/use-camera-microphone-again/use-camera-microphone-again.component';
import {DropoutPageComponent} from './pages/dropout-page/dropout-page.component';

const routes: Routes = [
  {path: Paths.SelfTest, component: SelfTestComponent},
  {path: Paths.UseCameraAndMicrophoneAgain, component: UseCameraMicrophoneAgainComponent},
  {path: Paths.Dropout, component: DropoutPageComponent},
];

export const Components = [
  SelfTestComponent,
  UseCameraMicrophoneAgainComponent,
  DropoutPageComponent,
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
