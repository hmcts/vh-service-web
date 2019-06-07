import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';

const RepresentativeUserType = 'Representative';

@Injectable()
export class RepresentativeJourneyFactory implements JourneyFactory {
    private journey: RepresentativeJourney;
    private  bindings: RepresentativeJourneyStepComponentBindings;
    constructor(journey: RepresentativeJourney,
        private suitabilityService: RepresentativeSuitabilityService,
        bindings: RepresentativeJourneyStepComponentBindings,
        private journeyRoutingListenerService: JourneyRoutingListenerService) {
        this.journey = journey;
        this.bindings = bindings;
    }

    async begin(): Promise<void> {
        const models = await this.suitabilityService.getAllSuitabilityAnswers();
        this.journey.forSuitabilityAnswers(models);
        this.journeyRoutingListenerService.initialise(this.bindings, this.journey);
        return Promise.resolve();
    }

    handles(userType: string): boolean {
        return userType === RepresentativeUserType;
    }
}
