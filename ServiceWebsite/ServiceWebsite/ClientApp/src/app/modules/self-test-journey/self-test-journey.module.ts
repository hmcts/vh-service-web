import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {BaseJourneyModule} from '../base-journey/base-journey.module';
import {NgModule} from '@angular/core';
import {Components, SelfTestJourneyRoutingModule} from './self-test-journey-routing.module';
import {JourneyRoutingListenerService} from '../base-journey/services/journey-routing-listener.service';
import {SelfTestStepsOrderFactory} from './self-test-steps-order.factory';
import {SelfTestJourneyStepComponentBindings} from './self-test-journey-component-bindings';
import {SelfTestJourney} from './self-test-journey';

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    BaseJourneyModule,
    SelfTestJourneyRoutingModule
  ],
  declarations: [
    ...Components
  ],
  providers: [
    SelfTestJourney,
    SelfTestJourneyStepComponentBindings,
    JourneyRoutingListenerService,
    SelfTestStepsOrderFactory,
  ]
})

export class SelfTestJourneyModule {
}
