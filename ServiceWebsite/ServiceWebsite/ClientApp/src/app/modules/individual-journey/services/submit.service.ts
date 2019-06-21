import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { IndividualModelMapper } from './individual-model-mapper';
import { SuitabilityService } from './suitability.service';
import { SuitabilityAnswer, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: SuitabilityService) { }

  async submit(step: number, model: IndividualSuitabilityModel) {
    const saveModel = this.getSubmitModel(step, model);
    const answers: HearingSuitabilityAnswer[] = new IndividualModelMapper().mapToRequest(saveModel);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }

  isDropOffPoint(model: IndividualSuitabilityModel): boolean {
    // check access to a computer.
    if (model.computer === false) {
      return true;
    }
    // check access to a camera and microphone.
    if (model.camera === HasAccessToCamera.No) {
      return true;
    }
    // check access to the internet.
    if (model.internet === false) {
      return true;
    }
    // save after consent.
    if (model.consent.answer === true || model.consent.answer === false) {
      return true;
    }
    return false;
  }

  getSubmitModel(step: number, model: IndividualSuitabilityModel): IndividualSuitabilityModel {
    const modelToSave = model.clone();
    switch (step) {
      case 10: {
        modelToSave.camera = undefined;
        modelToSave.internet = undefined;
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();

        break;
      }
      case 11: {
        modelToSave.internet = undefined;
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();

        break;
      }
      case 12: {
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();

        break;
      }
      default: {
        console.log('not an exit step, do nothing');
        break;
      }
    }
    return modelToSave;
  }
}
