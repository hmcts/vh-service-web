import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { SuitabilityService } from './suitability.service';
import { ParticipantSuitabilityModel } from '../../base-journey/participant-suitability.model';
import { ParticipantModelMapper } from '../services/participant-model-mapper';
@Injectable()
export class SubmitService {
    constructor(private suitabilityService: SuitabilityService) {}

    async submit(model: ParticipantSuitabilityModel) {
        const answers: HearingSuitabilityAnswer[] = new ParticipantModelMapper().mapToRequest(model);
        await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
    }
}
