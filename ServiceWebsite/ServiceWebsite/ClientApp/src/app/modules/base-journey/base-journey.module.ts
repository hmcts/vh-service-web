import { ParticipantSuitabilityModel } from 'src/app/modules/base-journey/participant-suitability.model';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { ChoiceTextboxComponent } from './components/choice-textbox.component';
import { JourneySelector } from 'src/app/modules/base-journey/services/journey.selector';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BaseJourneyRoutingModule } from './base-journey-routing.module';

@NgModule({
  providers: [
    JourneySelector,
    {
      provide: JourneyBase,
      useFactory: (selector: JourneySelector) => selector.getJourney(),
      deps: [ JourneySelector ]
    },
    {
      provide: ParticipantSuitabilityModel,
      useFactory: (selector: JourneySelector) => selector.getModel(),
      deps: [ JourneySelector ]
    }
  ],
  declarations: [
    ChoiceTextboxComponent
  ],
  imports: [
    // angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // app
    SharedModule,
    BaseJourneyRoutingModule,
  ],
  exports: [
    ChoiceTextboxComponent
  ]
})
export class BaseJourneyModule {
}
