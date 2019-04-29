import { ApiClient } from './../../services/clients/api-client';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    constructor(private journey: IndividualJourney, private apiClient: ApiClient) {
    }

    create(): Promise<JourneyBase> {
        // this.apiClient.getUserSuitabilityAnswers()
        return Promise.resolve(this.journey);
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }
}
