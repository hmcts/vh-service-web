import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule } from './individual-journey-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    IndividualJourneyRoutingModule,
  ],
  declarations: [
  ],
 })
export class IndividualJourneyModule { }
