import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ChecklistThankYouComponent } from './checklist-thank-you/checklist-thank-you.component';
import { AccessToARoomComponent } from './access-to-a-room/access-to-a-room.component';
import { CheckYourAnswersComponent } from './check-your-answers/check-your-answers.component';
import { ChecklistAlreadySubmittedComponent } from './checklist-already-submitted/checklist-already-submitted.component';

const professionalCitizenRoutes: Routes = [
  { path: 'answers-received', component: ChecklistThankYouComponent },
  { path: 'thank-you', component: ChecklistThankYouComponent },
  { path: 'access-to-a-room', component: AccessToARoomComponent },
  { path: 'check-your-answers', component: CheckYourAnswersComponent },
  { path: 'checklist-already-submitted', component: ChecklistAlreadySubmittedComponent },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(professionalCitizenRoutes)
  ],
})
export class ProfessionalCitizenRoutingModule {
}
