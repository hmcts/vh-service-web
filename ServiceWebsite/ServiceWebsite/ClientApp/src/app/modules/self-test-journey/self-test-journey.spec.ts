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

  const givenDeviceIsMobile = () => {
    stepsFactory = new SelfTestStepsOrderFactory({
      isMobile: () => true
    } as DeviceType);
  };

  const nextStepIs = (step: JourneyStep) => {
    journey.next();
    expect(redirectedTo).toBe(step);
  };

  it(`should go to '${SelfTestJourneySteps.SignInOtherComputer}' if on mobile device`, () => {
    givenDeviceIsMobile();
    givenSelfTestAnswers(selfTestAnswers.none);
    journey.startAt(SelfTestJourneySteps.SameComputer);
    journey.next();
    expect(redirectedTo).toBe(SelfTestJourneySteps.SignInOtherComputer);
  });

  it(`should go to '${SelfTestJourneySteps.SignInOtherComputer}' if on not on same device as hearing will be done on`, () => {
    givenSelfTestAnswers(new SelfTestAnswers({
      sameComputer: false
    }));
    journey.startAt(SelfTestJourneySteps.SameComputer);
    journey.next();
    expect(redirectedTo).toBe(SelfTestJourneySteps.SignInOtherComputer);
  });

  it('should follow happy path if all answers are positive', () => {
    givenSelfTestAnswers(selfTestAnswers.lastAnswerRemaining);

    journey.startAt(SelfTestJourneySteps.SameComputer);
    nextStepIs(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
    nextStepIs(SelfTestJourneySteps.SelfTest);
    nextStepIs(SelfTestJourneySteps.CameraWorking);
    nextStepIs(SelfTestJourneySteps.MicrophoneWorking);
    nextStepIs(SelfTestJourneySteps.SeeAndHearVideo);
  });

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

  it(`should submit and go to thank you after finishing the journey`, () => {
    givenSelfTestAnswers(selfTestAnswers.lastAnswerRemaining);
    let submittedModel: ParticipantSuitabilityModel;
    journey.submit.subscribe((submitted: ParticipantSuitabilityModel) => submittedModel = submitted);

    journey.startAt(SelfTestJourneySteps.SeeAndHearVideo);
    journey.model.selfTest.seeAndHearClearly = true;
    journey.next();

    expect(submittedModel.selfTest.seeAndHearClearly).toBe(true);
    expect(redirectedTo).toBe(ParticipantJourneySteps.ThankYou);
  });

  it('should fail if trying to proceed from an unknown step', () => {
    givenSelfTestAnswers(selfTestAnswers.none);
    journey.startAt(ParticipantJourneySteps.AboutYourComputer);
    expect(() => journey.next()).toThrowError(`Current step 'AboutYourComputer' is not part of the self test`);
  });

  it('should redirect to videoapp if done', () => {
    givenSelfTestAnswers(selfTestAnswers.done);
    journey.jumpTo(SelfTestJourneySteps.SelfTest);
    expect(redirectedTo).toBe(ParticipantJourneySteps.GotoVideoApp);
  });
});
