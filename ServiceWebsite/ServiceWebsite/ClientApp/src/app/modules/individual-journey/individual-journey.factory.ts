import { SuitabilityService } from './services/suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    private journey: IndividualJourney;
    private  bindings: JourneyStepComponentBindings;

    constructor(journey: IndividualJourney,
        private suitabilityService: SuitabilityService,
        bindings: JourneyStepComponentBindings,
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
        return userType === IndividualUserType;
    }
}
