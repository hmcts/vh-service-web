import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {CameraWorkingComponent} from './camera-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import {MutableIndividualSuitabilityModel} from '../../../individual-journey/mutable-individual-suitability.model';
import {SelfTestAnswers} from '../../../base-journey/participant-suitability.model';

describe('CameraWorkingComponent', () => {
it(`should submit and go to ${SelfTestJourneySteps.MicrophoneWorking}`, async () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    const model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();

    const component = new CameraWorkingComponent(journey, model);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.MicrophoneWorking);
  });
});
