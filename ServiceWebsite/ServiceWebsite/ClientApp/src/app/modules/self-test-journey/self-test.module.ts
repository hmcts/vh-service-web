import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {BaseJourneyModule} from '../base-journey/base-journey.module';
import {NgModule} from '@angular/core';
import {Components, SelfTestRoutingModule} from './self-test-routing.module';

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
  providers: []
})

export class SelfTestModule {
}
