import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutHearingsComponent } from '../citizen/about-hearings/about-hearings.component';
import { DifferentHearingTypesComponent } from '../citizen/different-hearing-types/different-hearing-types.component';
import { InterpreterComponent } from '../citizen/interpreter/interpreter.component';
import { ContinueToQuestionsComponent } from '../citizen/continue-to-questions/continue-to-questions.component';
import { MakeTheCourtAwareComponent } from '../citizen/make-the-court-aware/make-the-court-aware.component';
import { EquipmentComponent } from '../citizen/equipment/equipment.component';
import { ConsentComponent } from '../citizen/consent/consent.component';

const citizenRoutes: Routes = [
  { path: 'consent', component: ConsentComponent },
  { path: 'about-hearings', component: AboutHearingsComponent },
  { path: 'different-hearing-types', component: DifferentHearingTypesComponent },
  { path: 'continue-to-questions', component: ContinueToQuestionsComponent },
  { path: 'interpreter', component: InterpreterComponent },
  { path: 'make-the-court-aware', component: MakeTheCourtAwareComponent },
  { path: 'equipment', component: EquipmentComponent },
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
