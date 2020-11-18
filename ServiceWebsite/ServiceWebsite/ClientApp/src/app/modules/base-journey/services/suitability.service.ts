import { ApiClient, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { Injectable } from '@angular/core';
import { ParticipantSuitabilityModel } from '../../base-journey/participant-suitability.model';
import { ParticipantModelMapper } from '../services/participant-model-mapper';

@Injectable()
export class SuitabilityService {
    private mapper = new ParticipantModelMapper();

    constructor(private client: ApiClient) {}

    async getAllSuitabilityAnswers(): Promise<ParticipantSuitabilityModel[]> {
        const responses = await this.client.getUserSuitabilityAnswers().toPromise();
        return responses.map(suitability => this.mapper.map(suitability));
    }

    async updateSuitabilityAnswers(hearingId: string, answers: HearingSuitabilityAnswer[]): Promise<void> {
        const response = await this.client.updateSuitabilityAnswers(hearingId, answers).toPromise();
        return response;
    }
}
