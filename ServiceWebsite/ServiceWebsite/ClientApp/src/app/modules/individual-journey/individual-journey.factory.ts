import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SuitabilityService } from './services/suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import {IndividualJourneyService} from './services/individual-journey.service';
import {IndividualSuitabilityModel} from './individual-suitability.model';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

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

    async begin(): Promise<JourneyBase> {
      this.journey.redirect.subscribe(() =>
      this.individualJourneyService.set(this.journey.model));

      let models: IndividualSuitabilityModel[] = [];
      const cachedModel = this.individualJourneyService.get();

      if (cachedModel === null) {
        models = await this.suitabilityService.getAllSuitabilityAnswers();
      } else {
        models.push(cachedModel);
      }

      this.journeyRoutingListenerService.startRouting(this.bindings, this.journey);
      this.journey.forSuitabilityAnswers(models);
      this.journeyRoutingListenerService.startJourneyAtCurrentRoute();

      return Promise.resolve(this.journey);
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }

    getModel(): ParticipantSuitabilityModel {
      return this.journey.model;
    }
}
