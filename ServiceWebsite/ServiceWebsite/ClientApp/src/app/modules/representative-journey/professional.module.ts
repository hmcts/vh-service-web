import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfessionalRoutingModule } from './professional-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessionalRoutingModule,
  ],

})
export class ProfessionalModule {
}
