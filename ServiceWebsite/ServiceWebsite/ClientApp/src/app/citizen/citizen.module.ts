import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AboutHearingsComponent } from './about-hearings/about-hearings.component';
import { DifferentHearingTypesComponent } from './different-hearing-types/different-hearing-types.component';
import { ContinueToQuestionsComponent } from './continue-to-questions/continue-to-questions.component';
import { InterpreterComponent } from './interpreter/interpreter.component';
import { MakeTheCourtAwareComponent } from './make-the-court-aware/make-the-court-aware.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ConsentComponent } from './consent/consent.component';
import { SharedModule } from '../shared/shared.module';
import { CitizenRoutingModule } from './citizen-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CitizenRoutingModule,
  ],
  declarations: [
    AboutHearingsComponent,
    DifferentHearingTypesComponent,
    ContinueToQuestionsComponent,
    InterpreterComponent,
    MakeTheCourtAwareComponent,
    EquipmentComponent,
    ConsentComponent,
  ],
 })
export class CitizenModule { }
