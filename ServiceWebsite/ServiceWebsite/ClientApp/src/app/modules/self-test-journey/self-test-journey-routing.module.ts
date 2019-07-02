import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Paths} from './paths';
import {SelfTestComponent} from './pages/self-test/self-test.component';
import {SecondPageComponent} from './pages/second-page/second-page.component';
import {DropoutPageComponent} from './pages/dropout-page/dropout-page.component';

const routes: Routes = [
  {path: Paths.SelfTest, component: SelfTestComponent},
  {path: Paths.Second, component: SecondPageComponent},
  {path: Paths.Dropout, component: DropoutPageComponent},
];

export const Components = [
  SelfTestComponent,
  SecondPageComponent,
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
