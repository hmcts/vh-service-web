import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";

import { ChecklistThankYouComponent } from './checklist-thank-you/checklist-thank-you.component';
import { AccessToARoomComponent } from './access-to-a-room/access-to-a-room.component';
import { CheckYourAnswersComponent } from './check-your-answers/check-your-answers.component';
import { ChecklistAlreadySubmittedComponent } from './checklist-already-submitted/checklist-already-submitted.component';

import { SharedModule } from './shared/shared.module';
import { ProfessionalCitizenRoutingModule } from './professional-citizen-routing.module';

@NgModule({
  declarations: [
    ChecklistThankYouComponent,
    AccessToARoomComponent,
    CheckYourAnswersComponent,
    ChecklistAlreadySubmittedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProfessionalCitizenRoutingModule,
  ],
})
export class ProfessionalCitizenModule {
}
