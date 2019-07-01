import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';
import {TestPageComponent} from './pages/test-page/test-page.component';


const routes: Routes = [
  { path: Paths.TestPage, component: TestPageComponent },
];

export const Components = [
  TestPageComponent
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
