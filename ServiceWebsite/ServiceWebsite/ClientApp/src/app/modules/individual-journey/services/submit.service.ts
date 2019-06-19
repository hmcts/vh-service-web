import { Injectable } from '@angular/core';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { IndividualModelMapper } from './individual-model-mapper';
import { SuitabilityService } from './suitability.service';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: SuitabilityService) {
  }

  async submit(model: MutableIndividualSuitabilityModel) {
    const answers: HearingSuitabilityAnswer[] = new IndividualModelMapper().mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }
}
