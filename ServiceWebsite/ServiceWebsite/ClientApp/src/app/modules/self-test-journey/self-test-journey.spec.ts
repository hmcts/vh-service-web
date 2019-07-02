import { JourneyStep } from './../base-journey/journey-step';
import { SelfTestJourney } from './self-test-journey';
import { SelfTestStepsOrderFactory } from './self-test-steps-order.factory';
import { DeviceType } from '../base-journey/services/device-type';
import { ParticipantSuitabilityModel, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from './self-test-journey-steps';

describe('SelfTestJourney', () => {
  let journey:  SelfTestJourney;
  let model: ParticipantSuitabilityModel;

  let redirectedTo: JourneyStep;

  const deviceTypeDesktop = {
    isMobile: () => false,
    isTablet: () => false,
    isDesktop: () => true
  } as DeviceType;

  beforeEach(() => {
    journey = new SelfTestJourney(new SelfTestStepsOrderFactory(deviceTypeDesktop));
    journey.redirect.subscribe((step: JourneyStep) => redirectedTo = step);
  });

  const givenSelfTestAnswers = (answers: SelfTestAnswers) => {
    model = {
      selfTest: answers
    } as ParticipantSuitabilityModel;

    journey.setModel(model);
  };

  it('should redirect to video web if self-test is completed', ()  => {
    givenSelfTestAnswers(new SelfTestAnswers({
      seeAndHearClearly: true,
      cameraWorking:  true,
      sameComputer: true,
      microphoneWorking: true
    }));

    // when starting journey
    journey.startAt(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);

    // then redirects
    expect(redirectedTo).toBe(SelfTestJourneySteps.GotoVideoApp);
  });
});
