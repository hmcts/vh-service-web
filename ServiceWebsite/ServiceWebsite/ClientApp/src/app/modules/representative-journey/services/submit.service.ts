import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { RepresentativeModelMapper } from './representative-model-mapper';
import { RepresentativeSuitabilityService } from './representative-suitability.service';
import { SuitabilityAnswer, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { JourneyStep } from '../../base-journey/journey-step';
import { RepresentativeJourneySteps } from '../representative-journey-steps';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: RepresentativeSuitabilityService) { }

  async submit(model: RepresentativeSuitabilityModel) {
    const answers: HearingSuitabilityAnswer[] = new RepresentativeModelMapper().mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }

  isDropOffPoint(model: RepresentativeSuitabilityModel): boolean {
    // check access to a computer.
    if (model.computer === false) {
      return true;
    }
    // check access to a camera and microphone.
    if (model.camera === HasAccessToCamera.No) {
      return true;
    }
    return false;
  }
}
