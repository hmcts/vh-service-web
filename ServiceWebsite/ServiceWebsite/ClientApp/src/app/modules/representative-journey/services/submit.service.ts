import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { RepresentativeModelMapper } from './representative-model-mapper';
import { RepresentativeSuitabilityService } from './representative-suitability.service';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: RepresentativeSuitabilityService) { }

  async submit(model: RepresentativeSuitabilityModel) {
    const answers: HearingSuitabilityAnswer[] = new RepresentativeModelMapper().mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }
}
