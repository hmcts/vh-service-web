import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { CheckYourComputerComponent } from './check-your-computer.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import { MutableIndividualSuitabilityModel } from '../../../individual-journey/mutable-individual-suitability.model';
import { IndividualSuitabilityModel } from 'src/app/modules/individual-journey/individual-suitability.model';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { Router } from '@angular/router';

describe('CheckYourComputerComponent', () => {
  let journey: jasmine.SpyObj<JourneyBase>;
  let model: IndividualSuitabilityModel;
  let deviceType: jasmine.SpyObj<DeviceType>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
    deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet']);
    routerSpy = jasmine.createSpyObj<Router>(['navigate']);
  });

  it(`should submit and go to ${SelfTestJourneySteps.SignBackIn} if answering no`, async () => {
    const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy);
    component.choice.setValue(false);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SignBackIn);
  });

  it(`should submit and go to ${SelfTestJourneySteps.SignInOnComputer} if answering yes and device type is mobile`, async () => {
    deviceType.isMobile.and.returnValue(true);
    deviceType.isTablet.and.returnValue(false);
    const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy);
    component.choice.setValue(true);
    await component.submit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/sign-in-on-computer']);
  });

  it(`should submit and go to ${SelfTestJourneySteps.SwitchOnCameraAndMicrophone}
   if answering yes and device type is not mobile`, async () => {
     deviceType.isMobile.and.returnValue(false);
     deviceType.isTablet.and.returnValue(true);
    const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy);
    component.choice.setValue(true);
    await component.submit();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
  });

  it('should load any previous value', () => {
    model.selfTest.checkYourComputer = false;
    const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy);
    component.ngOnInit();
    expect(component.choice.value).toBe(false);
  });

  it('should not redirect on invalid form', async () => {
    const component = new CheckYourComputerComponent(journey, model, deviceType, routerSpy);
    await component.submit();
    expect(journey.goto).not.toHaveBeenCalled();
  });
});
