import { AboutHearingsComponent } from './about-hearings/about-hearings.component';
import { BaseJourneyModule } from './../base-journey/base-journey.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Paths } from './paths';
import { InformationVideoComponent } from './information-video/information-video.component';

const routes: Routes = [
  { path: Paths.AboutHearings, component: AboutHearingsComponent},
  { path: Paths.InformationVideo, component: InformationVideoComponent}
];

@NgModule({
  imports: [
    // angular
    RouterModule.forChild(routes),

    // app
    BaseJourneyModule
  ],
  exports: [
    RouterModule
  ]
})
export class IndividualJourneyRoutingModule {
}
