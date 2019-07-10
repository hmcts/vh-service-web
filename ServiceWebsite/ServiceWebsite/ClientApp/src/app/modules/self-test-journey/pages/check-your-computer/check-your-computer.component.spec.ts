import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { CheckYourComputerComponent } from './check-your-computer.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import { IndividualSuitabilityModel } from 'src/app/modules/individual-journey/individual-suitability.model';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

describe('CheckYourComputerComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: IndividualSuitabilityModel;
  let deviceType: jasmine.SpyObj<DeviceType>;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
    deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);

  });

  it(`should submit and go to ${SelfTestJourneySteps.SignBackIn} if answering no`, async () => {
    const component = new CheckYourComputerComponent(journey, model, deviceType);
    component.choice.setValue(false);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SignBackIn);
  });

  it(`should submit and go to ${SelfTestJourneySteps.SignInOnComputer} if answering yes and device type is mobile`, async () => {
    deviceType.isMobile.and.returnValue(true);
    const component = new CheckYourComputerComponent(journey, model, deviceType);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SignInOnComputer);
  });

  it(`should submit and go to ${SelfTestJourneySteps.SwitchOnCameraAndMicrophone}
   if answering yes and device type is not mobile`, async () => {
    deviceType.isMobile.and.returnValue(false);
    const component = new CheckYourComputerComponent(journey, model, deviceType);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
  });

  it('should load any previous value', () => {
    model.selfTest.checkYourComputer = false;
    const component = new CheckYourComputerComponent(journey, model, deviceType);
    component.ngOnInit();
    expect(component.choice.value).toBe(false);
  });

  it('should not redirect on invalid form', async () => {
    const component = new CheckYourComputerComponent(journey, model, deviceType);
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
