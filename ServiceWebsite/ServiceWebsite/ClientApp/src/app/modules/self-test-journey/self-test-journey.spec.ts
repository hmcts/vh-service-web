import { JourneyStep } from './../base-journey/journey-step';
import { SelfTestJourney } from './self-test-journey';
import { ParticipantSuitabilityModel, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from './self-test-journey-steps';
import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';

describe('SelfTestJourney', () => {
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

  const givenSelfTestAnswers = (answers: SelfTestAnswers) => {
    model = {
      selfTest: answers
    } as ParticipantSuitabilityModel;

    journey = new SelfTestJourney(model);
    journey.redirect.subscribe((step: JourneyStep) => redirectedTo = step);
  };

  it('should redirect to videoapp if done', () => {
    givenSelfTestAnswers(selfTestAnswers.done);
    journey.jumpTo(SelfTestJourneySteps.SelfTest);
    expect(redirectedTo).toBe(ParticipantJourneySteps.GotoVideoApp);
  });
});
