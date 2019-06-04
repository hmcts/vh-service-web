import { HearingService } from './services/hearing.service';
import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { Injectable } from '@angular/core';
import { RepresentativeJourneyRoutingListenerService } from './services/representative-journey-routing-listener.service';

const RepresentativeUserType = 'Representative';

@Injectable()
export class RepresentativeJourneyFactory implements JourneyFactory {

    constructor(private journey: RepresentativeJourney,
        private suitabilityService: RepresentativeSuitabilityService,
        private hearingService: HearingService,
        private journeyRoutingListenerService: RepresentativeJourneyRoutingListenerService) {
    }

    async begin(): Promise<void> {
        const models = await this.suitabilityService.getAllSuitabilityAnswers();
        this.journey.forSuitabilityAnswers(models);
        this.journeyRoutingListenerService.initialise();
        if (this.journey.model) {
            // pre-load the selected hearing
            await this.hearingService.get(this.journey.model.hearing.id);
        }
        return Promise.resolve();
    }

    handles(userType: string): boolean {
        return userType === RepresentativeUserType;
    }
}
