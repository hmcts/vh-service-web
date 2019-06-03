import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Paths } from './paths';

// components
import { AboutVideoHearingsComponent } from './pages/about-video-hearings/about-video-hearings.component';

const routes: Routes = [
  { path: Paths.AboutVideoHearings, component: AboutVideoHearingsComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class RepresentativeJourneyRoutingModule {
}
