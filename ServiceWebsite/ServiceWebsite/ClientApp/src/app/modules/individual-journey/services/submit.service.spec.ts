import { SubmitService } from './submit.service';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Hearing, SelfTestAnswers } from '../../base-journey/participant-suitability.model';
import { SuitabilityService } from './suitability.service';
import { IndividualJourneySteps } from '../individual-journey-steps';
import { HasAccessToCamera } from '../individual-suitability.model';

describe('SubmitService', () => {
  const suitabilityService = jasmine.createSpyObj<SuitabilityService>(['updateSuitabilityAnswers']);
  const submitService = new SubmitService(suitabilityService);

  const model = new MutableIndividualSuitabilityModel();
  beforeEach(() => {
    model.hearing = new Hearing();
    model.aboutYou.answer = true;
    model.aboutYou.notes = 'notes';
    model.interpreter = false;
    model.computer = true;
    model.camera = HasAccessToCamera.Yes;
    model.internet = true;
    model.room = true;
    model.consent.answer = true;
    model.consent.notes = 'consent notes';
    model.selfTest = new SelfTestAnswers();
    model.selfTest.cameraWorking = true;
    model.selfTest.microphoneWorking = true;
    model.selfTest.seeAndHearClearly = true;
    model.selfTest.checkYourComputer = true;
  });

  it('should call the suitability service to submit answers', async () => {
    await submitService.submit(model);
    expect(suitabilityService.updateSuitabilityAnswers).toHaveBeenCalled();
  });

  it('should clear the answers after the drop off point - access to computer', () => {
    model.computer = false;
    const saveModel = submitService.updateSubmitModel(IndividualJourneySteps.AccessToComputer, model);

    expect(saveModel.camera).toBe(undefined);
    expect(saveModel.internet).toBe(undefined);
    expect(saveModel.room).toBe(undefined);
    expect(saveModel.consent.answer).toBe(undefined);
    expect(saveModel.consent.notes).toBe(undefined);

  });
  it('should clear the answers after the drop off point - access to camera', () => {
    model.computer = true;
    model.camera = HasAccessToCamera.No;
    const saveModel = submitService.updateSubmitModel(IndividualJourneySteps.AccessToCameraAndMicrophone, model);

    expect(saveModel.internet).toBe(undefined);
    expect(saveModel.room).toBe(undefined);
    expect(saveModel.consent.answer).toBe(undefined);
    expect(saveModel.consent.notes).toBe(undefined);
  });
  it('should clear the answers after the drop off point - access to internet', () => {
    model.computer = true;
    model.camera = HasAccessToCamera.No;
    model.internet = false;
    const saveModel = submitService.updateSubmitModel(IndividualJourneySteps.YourInternetConnection, model);

    expect(saveModel.room).toBe(undefined);
    expect(saveModel.consent.answer).toBe(undefined);
    expect(saveModel.consent.notes).toBe(undefined);
  });
});
