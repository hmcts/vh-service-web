import { SuitabilityService } from './services/suitability.service';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    constructor(private journey: IndividualJourney, private suitabilityService: SuitabilityService) {
    }

    async create(): Promise<JourneyBase> {
        const models = await this.suitabilityService.getAllSuitabilityAnswers();

        const upcoming = models.filter(h => h.isUpcoming());
        if (upcoming.length === 0) {
            this.journey.withNoUpcomingHearings();
            return this.journey;
        }

        for (const model of models) {
            this.journey.withAnswers(model);
            if (this.journey.isCompleted()) {
                return this.journey;
            }
        }

        // finally, if we have an upcoming model that's not completed then let's pick the first upcoming one
        const nextUpcoming = upcoming[0];
        this.journey.withAnswers(nextUpcoming);
        return this.journey;
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }
}
