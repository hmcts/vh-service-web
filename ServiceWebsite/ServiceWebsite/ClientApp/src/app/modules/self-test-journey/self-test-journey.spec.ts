import { JourneyStep } from './../base-journey/journey-step';
import { SelfTestJourney } from './self-test-journey';
import { SelfTestStepsOrderFactory } from './self-test-steps-order.factory';
import { DeviceType } from '../base-journey/services/device-type';
import { ParticipantSuitabilityModel, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from './self-test-journey-steps';

describe('SelfTestJourney', () => {
  const deviceTypeDesktop = {
    isMobile: () => false,
    isTablet: () => false,
    isDesktop: () => true
  } as DeviceType;

  const stepsFactory = new SelfTestStepsOrderFactory(deviceTypeDesktop);

  let journey:  SelfTestJourney;
  let model: ParticipantSuitabilityModel;

  let redirectedTo: JourneyStep;

  const selfTestAnswers = {
    allPositive: new SelfTestAnswers({
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
    })
  };

  const givenSelfTestAnswers = (answers: SelfTestAnswers) => {
    model = {
      selfTest: answers
    } as ParticipantSuitabilityModel;

    journey = new SelfTestJourney(model, stepsFactory);
    journey.redirect.subscribe((step: JourneyStep) => redirectedTo = step);
  };

  const nextStepIs = (step: JourneyStep) => {
    journey.next();
    expect(redirectedTo).toBe(step);
  };

  it('should follow happy path if all answers are positive', () => {
    givenSelfTestAnswers(selfTestAnswers.lastAnswerRemaining);

    journey.startAt(SelfTestJourneySteps.SameComputer);
    nextStepIs(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
    nextStepIs(SelfTestJourneySteps.SelfTest);
    nextStepIs(SelfTestJourneySteps.CameraWorking);
    nextStepIs(SelfTestJourneySteps.MicrophoneWorking);
    nextStepIs(SelfTestJourneySteps.SeeAndHearVideo);
  });

  it('should raise exception if proceeding past last step', () => {
    givenSelfTestAnswers(selfTestAnswers.lastAnswerRemaining);
    journey.startAt(SelfTestJourneySteps.SeeAndHearVideo);
    expect(() => journey.next()).toThrowError(`Cannot proceed past last step '${SelfTestJourneySteps.SeeAndHearVideo}'`);
  });

  it('should redirect to video web if self-test is completed', ()  => {
    givenSelfTestAnswers(selfTestAnswers.allPositive);

    // for any self test  step
    for (const step of stepsFactory.stepOrder()) {
      // when starting journey at that step
      journey.startAt(step);

      // then redirects
      expect(redirectedTo).toBe(SelfTestJourneySteps.GotoVideoApp);
    }
  });
});
