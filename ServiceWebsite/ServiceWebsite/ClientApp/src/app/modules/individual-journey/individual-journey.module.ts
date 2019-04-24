import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// app modules
import { SharedModule } from '../shared/shared.module';
import { IndividualJourneyRoutingModule } from './individual-journey-routing.module';

// services
import { Localisation } from 'src/app/modules/shared/localisation';
import { IndividualLocalisation } from './services/individual-localisation';

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    IndividualJourneyRoutingModule,
  ],
  declarations: [
  ],
  providers: [
    { provide: Localisation, useClass: IndividualLocalisation }
  ]
 })
export class IndividualJourneyModule { }
