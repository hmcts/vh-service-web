import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AboutHearingsComponent } from './components/about-hearings/about-hearings.component';

// directives/pipes
import { LocalisePipe } from './pipes/localise.pipe';

const routes: Routes = [
  { path: 'about-hearings', component: AboutHearingsComponent }
];

@NgModule({
  declarations: [
    LocalisePipe,
    AboutHearingsComponent
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
