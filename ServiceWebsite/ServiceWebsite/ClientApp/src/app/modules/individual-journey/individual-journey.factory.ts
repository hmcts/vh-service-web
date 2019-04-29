import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';
import { ApiClient } from './../../services/clients/api-client';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualJourney } from './individual-journey';
import { Injectable } from '@angular/core';
import { IndividualSuitabilityModel } from './individual-suitability.model';

const IndividualUserType = 'Individual';

@Injectable()
export class IndividualJourneyFactory implements JourneyFactory {

    constructor(private journey: IndividualJourney, private apiClient: ApiClient) {
    }

    async create(): Promise<JourneyBase> {
        const suitability = this.mapAll(await this.apiClient.getUserSuitabilityAnswers().toPromise());

        return Promise.resolve(this.journey);
    }

    private mapAll(input: any[]): IndividualSuitabilityModel[] {
        return input.map(item => this.mapHearingSuitability(item));
    }

    private mapHearingSuitability(input: any): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        return model;
    }

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }
}
