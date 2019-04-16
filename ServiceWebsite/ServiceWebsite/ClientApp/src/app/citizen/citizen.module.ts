import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AboutHearingsComponent } from './about-hearings/about-hearings.component';
import { ContinueToQuestionsComponent } from './continue-to-questions/continue-to-questions.component';
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
    ContinueToQuestionsComponent,
  ],
 })
export class CitizenModule { }
