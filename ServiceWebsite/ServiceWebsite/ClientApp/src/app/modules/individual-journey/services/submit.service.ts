import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { IndividualModelMapper } from './individual-model-mapper';
import { SuitabilityService } from './suitability.service';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

@Injectable()
export class SubmitService {
    constructor(private suitabilityService: SuitabilityService) {}

    async submit(model: IndividualSuitabilityModel) {
        const answers: HearingSuitabilityAnswer[] = new IndividualModelMapper().mapToRequest(model);
        await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
    }
}
