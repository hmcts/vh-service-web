import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {BaseJourneyModule} from '../base-journey/base-journey.module';
import {NgModule} from '@angular/core';
import {Components, SelfTestRoutingModule} from './self-test-routing.module';
import {Localisation} from '../shared/localisation';
import {IndividualLocalisation} from '../individual-journey/services/individual-localisation';
import {JOURNEY_FACTORY} from '../base-journey/services/journey.selector';
import {JourneyRoutingListenerService} from '../base-journey/services/journey-routing-listener.service';
import {SelfTestJourneyService} from './self-test-journey.service';
import {SelfTestStepsOrderFactory} from './self-test-steps-order.factory';
import {SelfTestJourneyStepComponentBindings} from './self-test-journey-component-bindings';
import {SelfTestJourney} from './self-test-journey';
import {SelfTestJourneyFactory} from './self-test-journey.factory';
import {SelfTestModel} from './self-test.model';

@NgModule({
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // app
    SharedModule,
    BaseJourneyModule,
    SelfTestRoutingModule
  ],
  declarations: [
    ...Components
  ],
  providers: [
    { provide: Localisation, useClass: IndividualLocalisation },
    { provide: SelfTestModel, useFactory: SelfTestModel },
    { provide: JOURNEY_FACTORY, useClass: SelfTestJourneyFactory, multi: true },
    SelfTestJourney,
    SelfTestJourneyStepComponentBindings,
    JourneyRoutingListenerService,
    SelfTestStepsOrderFactory,
    SelfTestJourneyService,
  ]
})

export class SelfTestModule {
}
