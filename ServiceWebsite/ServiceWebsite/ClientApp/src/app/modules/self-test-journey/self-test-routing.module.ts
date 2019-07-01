import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './paths';
import {FirstPageComponent} from './pages/first-page/first-page.component';
import {SecondPageComponent} from './pages/second-page/second-page.component';
import {DropoutPageComponent} from './pages/dropout-page/dropout-page.component';

const routes: Routes = [
  { path: Paths.FirstPage, component: FirstPageComponent },
  { path: Paths.SecondPage, component: SecondPageComponent },
  { path: Paths.DropoutPage, component: DropoutPageComponent },
];

export const Components = [
  FirstPageComponent,
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
export class SelfTestRoutingModule { }
