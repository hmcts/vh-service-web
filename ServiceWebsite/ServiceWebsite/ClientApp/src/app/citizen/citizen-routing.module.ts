import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutHearingsComponent } from '../citizen/about-hearings/about-hearings.component';
import { ContinueToQuestionsComponent } from '../citizen/continue-to-questions/continue-to-questions.component';

const citizenRoutes: Routes = [
  { path: 'about-hearings', component: AboutHearingsComponent },
  { path: 'continue-to-questions', component: ContinueToQuestionsComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(citizenRoutes)
  ],
})
export class CitizenRoutingModule {
}
