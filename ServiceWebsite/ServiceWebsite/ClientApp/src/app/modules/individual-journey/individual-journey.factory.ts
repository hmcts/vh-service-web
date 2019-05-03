import { SuitabilityService } from './services/suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';
import { JourneyRoutingListenerService } from './services/journey-routing-listener.service';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    constructor(private journey: IndividualJourney,
        private suitabilityService: SuitabilityService,
        private journeyRoutingListenerService: JourneyRoutingListenerService) {
    }

    async begin(): Promise<void> {
        const models = await this.suitabilityService.getAllSuitabilityAnswers();
        this.journey.forSuitabilityAnswers(models);
        this.journeyRoutingListenerService.initialise();
        return Promise.resolve();
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }
}
