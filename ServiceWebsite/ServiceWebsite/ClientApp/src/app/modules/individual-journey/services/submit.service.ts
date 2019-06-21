import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { IndividualModelMapper } from './individual-model-mapper';
import { SuitabilityService } from './suitability.service';
import { SuitabilityAnswer, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: SuitabilityService) { }

  async submit(model: IndividualSuitabilityModel) {
    const answers: HearingSuitabilityAnswer[] = new IndividualModelMapper().mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }

  isDropOffPoint(step: number, model: IndividualSuitabilityModel): boolean {
    // check access to a computer.
    if (model.computer === false) {
      this.updateSubmitModel(step, model);
      this.submit(model);
      return true;
    }
    // check access to a camera and microphone.
    if (model.camera === HasAccessToCamera.No) {
      this.updateSubmitModel(step, model);
      this.submit(model);
      return true;
    }
    // check access to the internet.
    if (model.internet === false) {
      this.updateSubmitModel(step, model);
      this.submit(model);
      return true;
    }
    // save after consent.
    if (model.consent.answer === true || model.consent.answer === false) {
      this.updateSubmitModel(step, model);
      this.submit(model);
      return true;
    }
    return false;
  }

  private updateSubmitModel(step: number, model: IndividualSuitabilityModel): void {
    switch (step) {
      case 10: {
        model.camera = undefined;
        model.internet = undefined;
        model.room = undefined;
        model.consent = new SuitabilityAnswer();

        break;
      }
      case 11: {
        model.internet = undefined;
        model.room = undefined;
        model.consent = new SuitabilityAnswer();

        break;
      }
      case 12: {
        model.room = undefined;
        model.consent = new SuitabilityAnswer();

        break;
      }
      default: {
        console.log('not an exit step, do nothing');
        break;
      }
    }
  }
}
