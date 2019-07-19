import { Injectable } from '@angular/core';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { IndividualModelMapper } from './individual-model-mapper';
import { SuitabilityService } from './suitability.service';
import { SuitabilityAnswer, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { JourneyStep } from '../../base-journey/journey-step';
import { IndividualJourneySteps } from '../individual-journey-steps';

@Injectable()
export class SubmitService {

  constructor(private suitabilityService: SuitabilityService) { }

  async submit(model: IndividualSuitabilityModel) {
    const answers: HearingSuitabilityAnswer[] = new IndividualModelMapper().mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(model.hearing.id, answers);
  }

  updateSubmitModel(step: JourneyStep, model: IndividualSuitabilityModel): MutableIndividualSuitabilityModel {
    let modelToSave = new MutableIndividualSuitabilityModel();
    modelToSave = model;

    if (step === IndividualJourneySteps.AccessToComputer) {
        modelToSave.camera = undefined;
        modelToSave.internet = undefined;
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();
    } else if (step === IndividualJourneySteps.AccessToCameraAndMicrophone) {
        modelToSave.internet = undefined;
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();
    } else if (step === IndividualJourneySteps.YourInternetConnection) {
        modelToSave.room = undefined;
        modelToSave.consent = new SuitabilityAnswer();
    }

    // for any other step the model need not be updated

    return modelToSave;
  }
}
