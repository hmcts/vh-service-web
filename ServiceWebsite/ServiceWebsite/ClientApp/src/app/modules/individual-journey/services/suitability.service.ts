import { ApiClient, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { IndividualModelMapper } from './individual-model-mapper';
import { Injectable } from '@angular/core';

@Injectable()
export class SuitabilityService {
    private mapper = new IndividualModelMapper();

    constructor(private client: ApiClient) {}

    async getAllSuitabilityAnswers(): Promise<IndividualSuitabilityModel[]> {
        const responses = await this.client.getUserSuitabilityAnswers().toPromise();
        return responses.map(suitability => this.mapper.map(suitability));
    }

    async updateSuitabilityAnswers(hearingId: string, answers: HearingSuitabilityAnswer[]): Promise<void> {
        const response = await this.client.updateSuitabilityAnswers(hearingId, answers).toPromise();
        return response;
    }
}
