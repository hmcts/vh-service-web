import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SameComputerComponent } from './same-computer.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import { IndividualSuitabilityModel } from 'src/app/modules/individual-journey/individual-suitability.model';
import { compileComponentFromMetadata } from '@angular/compiler';

describe('SameComputerComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: IndividualSuitabilityModel;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
  });

  it(`should submit and go to ${SelfTestJourneySteps.UseCameraAndMicrophoneAgain} if answering yes`, async () => {
    const component = new SameComputerComponent(journey, model);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
  });

  it('should load any previous value', () => {
    model.selfTest.sameComputer = false;
    const component = new SameComputerComponent(journey, model);
    component.ngOnInit();
    expect(component.choice.value).toBe(false);
  });

  it('should not redirect on invalid form', async () => {
    const component = new SameComputerComponent(journey, model);
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
