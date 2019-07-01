import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { SelfTestJourney } from './self-test-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { SelfTestJourneyStepComponentBindings } from './self-test-journey-component-bindings';
import {SelfTestJourneyService} from './self-test-journey.service';

const UserType = 'xxx';

@Injectable()
export class SelfTestJourneyFactory implements JourneyFactory {

  private readonly journey: SelfTestJourney;
  private readonly bindings: SelfTestJourneyStepComponentBindings;

  constructor(journey: SelfTestJourney,
              bindings: SelfTestJourneyStepComponentBindings,
              private journeyRoutingListenerService: JourneyRoutingListenerService,
              private selfTestJourneyService: SelfTestJourneyService) {
    this.journey = journey;
    this.bindings = bindings;
  }

  async begin(): Promise<void> {
    this.journey.redirect.subscribe(() =>
      this.selfTestJourneyService.set(this.journey.model));

    this.journeyRoutingListenerService.initialise(this.bindings, this.journey);
    return Promise.resolve();
  }

  handles(userType: string): boolean {
    return userType === UserType;
  }
}
