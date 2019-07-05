import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SameComputerComponent } from './same-computer.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import {HasAccessToCamera, SelfTestAnswers} from '../../../base-journey/participant-suitability.model';
import {MutableIndividualSuitabilityModel} from '../../../individual-journey/mutable-individual-suitability.model';

describe('SameComputerComponent', () => {
  it(`should submit and go to ${SelfTestJourneySteps.UseCameraAndMicrophoneAgain} if answering yes`, async () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    const model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();

    const component = new SameComputerComponent(journey, model);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
  });
});
