import { JourneyStep } from './../base-journey/journey-step';
import { SelfTestJourney } from './self-test-journey';
import { SelfTestStepsOrderFactory } from './self-test-steps-order.factory';
import { DeviceType } from '../base-journey/services/device-type';
import { ParticipantSuitabilityModel, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from './self-test-journey-steps';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

describe('SelfTestJourney', () => {
  const deviceDesktop = {
    isMobile: () => false,
    isTablet: () => false,
    isDesktop: () => true
  } as DeviceType;

  let stepsFactory: SelfTestStepsOrderFactory;

  let journey:  SelfTestJourney;
  let model: ParticipantSuitabilityModel;

  let redirectedTo: JourneyStep;

  const selfTestAnswers = {
    done: new SelfTestAnswers({
      seeAndHearClearly: true,
      cameraWorking:  true,
      sameComputer: true,
      microphoneWorking: true
    }),
    lastAnswerRemaining: new SelfTestAnswers({
      seeAndHearClearly: undefined,
      cameraWorking:  true,
      sameComputer: true,
      microphoneWorking: true
    }),
    none: new SelfTestAnswers({})
  };

  beforeEach(() => {
    stepsFactory = new SelfTestStepsOrderFactory(deviceDesktop);
  });

  const givenSelfTestAnswers = (answers: SelfTestAnswers) => {
    model = {
      selfTest: answers
    } as ParticipantSuitabilityModel;

    journey = new SelfTestJourney(model, stepsFactory);
    journey.redirect.subscribe((step: JourneyStep) => redirectedTo = step);
  };

  it('should redirect to video web if self-test is completed', ()  => {
    givenSelfTestAnswers(selfTestAnswers.done);

    // for any self test  step
    for (const step of stepsFactory.stepOrder()) {
      // when starting journey at that step
      journey.startAt(step);

      // then redirects
      expect(redirectedTo).toBe(ParticipantJourneySteps.GotoVideoApp);
    }
  });

  it('should redirect to videoapp if done', () => {
    givenSelfTestAnswers(selfTestAnswers.done);
    journey.jumpTo(SelfTestJourneySteps.SelfTest);
    expect(redirectedTo).toBe(ParticipantJourneySteps.GotoVideoApp);
  });
});
