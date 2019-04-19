import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProfessionalCitizenRoutingModule } from './professional-citizen-routing.module';

@NgModule({
  declarations: [
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
