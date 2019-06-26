import { ApiClient, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { RepresentativeModelMapper } from './representative-model-mapper';
import { Injectable } from '@angular/core';

@Injectable()
export class RepresentativeSuitabilityService {
    private readonly mapper = new RepresentativeModelMapper();

    constructor(private client: ApiClient) {}

    async getAllSuitabilityAnswers(): Promise<RepresentativeSuitabilityModel[]> {
        const responses = await this.client.getUserSuitabilityAnswers().toPromise();
        return responses.map(suitability => this.mapper.map(suitability));
    }

    async updateSuitabilityAnswers(hearingId: string, answers: HearingSuitabilityAnswer[]): Promise<void> {
        const response = await this.client.updateSuitabilityAnswers(hearingId, answers).toPromise();
        return response;
      }
}
