import { IndividualStepsOrderFactory } from './individual-steps-order.factory';
import { IndividualJourneySteps } from './individual-journey-steps';
import { DeviceType } from '../base-journey/services/device-type';

describe('IndividualStepsOrderFactory, device is laptop', () => {
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  deviceType.isMobile.and.returnValue(false);
  const component = new IndividualStepsOrderFactory(deviceType);

  it('should return steps that include AccessToCameraAndMicrophone page', () => {
    const stepsInOrder = component.stepOrder();
    expect(stepsInOrder.length).toBeGreaterThan(0);
    expect(stepsInOrder.includes(IndividualJourneySteps.AccessToCameraAndMicrophone)).toBeTruthy();
  });
});

describe('IndividualStepsOrderFactory, device is mobile phone', () => {
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  deviceType.isMobile.and.returnValue(true);
  const component = new IndividualStepsOrderFactory(deviceType);

  it('should return steps that not include AccessToCameraAndMicrophone page', () => {
    const stepsInOrder = component.stepOrder();
    expect(stepsInOrder.length).toBeGreaterThan(0);
    expect(stepsInOrder.includes(IndividualJourneySteps.AccessToCameraAndMicrophone)).toBeFalsy();
  });
});
