import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { RepresentativeJourneyRoutingModule } from './representative-journey-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // app
    SharedModule,
    RepresentativeJourneyRoutingModule,
  ],
})
export class RepresentativeJourneyModule {
}
