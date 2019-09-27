import { MutableRepresentativeSuitabilityModel } from './mutable-representative-suitability.model';
import { SelfTestAnswers } from '../base-journey/participant-suitability.model';

describe('RepresentativeSuitabilityModel', () => {

  it('is completed if selftest is completed', () => {
    const model = new MutableRepresentativeSuitabilityModel();
    model.selfTest = new SelfTestAnswers({
      cameraWorking: true,
      seeAndHearClearly: true,
      checkYourComputer: true,
      microphoneWorking: true,
      selfTestResultScore: 'Okay'
    });

    expect(model.isCompleted()).toBe(true);
  });
});
