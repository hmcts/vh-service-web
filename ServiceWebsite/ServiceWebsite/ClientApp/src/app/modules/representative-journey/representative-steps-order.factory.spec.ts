import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps } from './representative-journey-steps';

describe('ReprestativeStepsOrderFactory, device is laptop', () => {
  const component = new RepresentativeStepsOrderFactory();

  it('should return steps for representative page', () => {
    const stepsInOrder = component.stepOrder();
    expect(stepsInOrder.length).toBeGreaterThan(0);
    expect(stepsInOrder.includes(RepresentativeJourneySteps.AboutVideoHearings)).toBeTruthy();
    expect(stepsInOrder.includes(RepresentativeJourneySteps.AboutYouAndYourClient)).toBeTruthy();
    expect(stepsInOrder.includes(RepresentativeJourneySteps.AboutYou)).toBeTruthy();
  });
});

