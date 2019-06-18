import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import {RepresentativeSuitabilityModel} from './representative-suitability.model';
import {SessionStorage} from '../shared/services/session-storage';
  import {MutableRepresentativeSuitabilityModel} from './mutable-representative-suitability.model';

const RepresentativeUserType = 'Representative';

@Injectable()
export class RepresentativeJourneyFactory implements JourneyFactory {
    private readonly journey: RepresentativeJourney;
    private readonly bindings: RepresentativeJourneyStepComponentBindings;
    private modelCache = new SessionStorage<RepresentativeSuitabilityModel>('REPRESENTATIVEJOURNEY_MODEL');

    constructor(journey: RepresentativeJourney,
        private suitabilityService: RepresentativeSuitabilityService,
        bindings: RepresentativeJourneyStepComponentBindings,
        private journeyRoutingListenerService: JourneyRoutingListenerService) {
        this.journey = journey;
        this.bindings = bindings;
    }

    async begin(): Promise<void> {
      this.journey.redirect.subscribe(()  => this.modelCache.set(this.journey.model));

      let models: RepresentativeSuitabilityModel[] = [];
      const cachedModel = this.modelCache.get();

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
        return userType === RepresentativeUserType;
    }
}
