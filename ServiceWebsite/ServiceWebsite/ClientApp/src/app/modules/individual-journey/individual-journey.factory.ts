import { SuitabilityService } from './services/suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import {IndividualJourneyService} from './services/individual-journey.service';
import {IndividualSuitabilityModel} from './individual-suitability.model';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    private readonly journey: IndividualJourney;
    private readonly bindings: JourneyStepComponentBindings;

    constructor(journey: IndividualJourney,
        private suitabilityService: SuitabilityService,
        bindings: JourneyStepComponentBindings,
        private journeyRoutingListenerService: JourneyRoutingListenerService,
        private individualJourneyService: IndividualJourneyService) {
            this.journey = journey;
            this.bindings = bindings;
    }

    async begin(): Promise<void> {
      this.journey.redirect.subscribe(() =>
      this.individualJourneyService.set(this.journey.model));

      let models: IndividualSuitabilityModel[] = [];
      const cachedModel = this.individualJourneyService.get();

      if (cachedModel === null) {
        models = await this.suitabilityService.getAllSuitabilityAnswers();
      } else {
        models.push(cachedModel);
      }

      this.journey.forSuitabilityAnswers(models);
      this.journeyRoutingListenerService.initialise(this.bindings, this.journey);
      return Promise.resolve();
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }
}
