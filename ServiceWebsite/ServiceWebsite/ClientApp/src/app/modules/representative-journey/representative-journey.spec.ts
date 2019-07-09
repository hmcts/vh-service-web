import { MutableRepresentativeSuitabilityModel } from './mutable-representative-suitability.model';
import { RepresentativeJourney } from './representative-journey';
import { HasAccessToCamera, Hearing, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps as Steps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';
import { TestLogger } from 'src/app/services/logger.spec';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(tomorrow.getDate() + 2);

describe('RepresentativeJourney', () => {
  let journey: RepresentativeJourney;
  let redirected: JourneyStep;
  let submitService: jasmine.SpyObj<SubmitService>;
  submitService = jasmine.createSpyObj<SubmitService>(['submit', 'updateSubmitModel']);

  const getModelForHearing = (id: string, scheduledDateTime: Date) => {
    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing(id, scheduledDateTime);
    model.selfTest = new SelfTestAnswers();
    return model;
  };

  const getCompletedModel = (id: string, scheduledDateTime: Date = tomorrow) => {
    const model = getModelForHearing(id, scheduledDateTime);
    model.aboutYou.answer = false;
    model.aboutYourClient.answer = true;
    model.hearingSuitability.answer = true;
    model.clientAttendance = true;
    model.camera = HasAccessToCamera.Yes;
    model.computer = true;
    model.room = true;

    model.selfTest = new SelfTestAnswers({
      cameraWorking: true,
      seeAndHearClearly: true,
      sameComputer: true,
      microphoneWorking: true
    });

    return model;
  };

  const getDroppedOutModel = (id: string) => {
    const model = getModelForHearing(id, tomorrow);
    model.computer = false;
    return model;
  };

  const getOnlyCompletedQuestionnaire = (id: string, scheduledDateTime: Date) => {
    const model = getCompletedModel(id, scheduledDateTime);
    model.selfTest = new SelfTestAnswers();
    return model;
  };

  // helper test data
  const suitabilityAnswers = {
    oneUpcomingHearing: () => [
      getModelForHearing('upcoming hearing id', tomorrow)
    ],
    twoUpcomingHearings: () => [
      getModelForHearing('later upcoming hearing id', dayAfterTomorrow),
      getModelForHearing('earlier upcoming hearing id', tomorrow)
    ],
    alreadyCompleted: () => [
      getCompletedModel('completed hearing id')
    ],
    completedAndUpcoming: () => [
      getModelForHearing('upcoming hearing id', dayAfterTomorrow),
      getCompletedModel('completed hearing id'),
      getModelForHearing('another upcoming hearing id', tomorrow)
    ],
    droppedOutFromQuestionnaire: () => [
      getDroppedOutModel('dropped out hearing')
    ],
    withoutSelfTest: () => [
      getOnlyCompletedQuestionnaire('completed questionnaire', tomorrow)
    ],
    noUpcomingHearings: []
  };

  beforeEach(() => {
    redirected = null;
    journey = new RepresentativeJourney(submitService, TestLogger);
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());

    journey.redirect.subscribe((s: JourneyStep) => redirected = s);
  });

  it('should goto video app if there are no upcoming hearings', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.noUpcomingHearings);
    journey.jumpTo(Steps.AboutVideoHearings);
    expect(redirected).toBe(Steps.GotoVideoApp);
  });

  it('should goto video app if trying to enter a finished journey', () => {
    // given journey that's finished
    journey.forSuitabilityAnswers(suitabilityAnswers.alreadyCompleted());

    // when trying to enter later in the journey
    journey.jumpTo(Steps.ClientAttendance);
    expect(redirected).toBe(Steps.GotoVideoApp);
  });

  it('should stay where it is if trying to enter at the current step', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());
    journey.startAt(Steps.AboutHearings);

    const currentStep = redirected;
    redirected = null;

    // when trying to go to the same step
    journey.jumpTo(currentStep);

    // we shouldn't have moved
    expect(redirected).toBeNull();
  });

  it('should run the story for the first upcoming hearing', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.twoUpcomingHearings());
    expect(journey.model.hearing.id).toBe('earlier upcoming hearing id');
  });

  it('should run the journey from start for the first upcoming hearing that is not completed', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.completedAndUpcoming());
    expect(journey.model.hearing.id).toBe('another upcoming hearing id');
    journey.startAt(Steps.AboutHearings);
    expect(redirected).toBe(Steps.AboutHearings);
  });

  it(`should enter journey at ${SelfTestJourneySteps.SameComputer} if completed questionnaire but not self-test`, () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.withoutSelfTest());
    journey.jumpTo(Steps.AboutVideoHearings);
    expect(journey.step).toBe(SelfTestJourneySteps.SameComputer);
    expect(redirected).toBe(SelfTestJourneySteps.SameComputer);
  });

  it(`can navigate to ${Steps.QuestionnaireCompleted} after dropping out on ${Steps.AccessToComputer}`, () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());
    journey.startAt(Steps.AccessToComputer);

    journey.model.computer = false;
    journey.jumpTo(Steps.QuestionnaireCompleted);

    expect(journey.step).toBe(Steps.QuestionnaireCompleted);
  });

  it(`can navigate to ${Steps.ContactUs} after having seen ${Steps.QuestionnaireCompleted} post dropout`, () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());
    journey.model.computer = false;
    journey.startAt(Steps.QuestionnaireCompleted);

    journey.jumpTo(Steps.ContactUs);

    expect(journey.step).toBe(Steps.ContactUs);
  });

  it(`should redirect to videoapp if having dropped out from questionnaire`, () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.droppedOutFromQuestionnaire());
    journey.startAt(Steps.AboutVideoHearings);

    expect(redirected).toBe(Steps.GotoVideoApp);
  });

  it(`should redirect go to ${Steps.ThankYou} when having completed self test`, () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.withoutSelfTest());
    journey.startAt(SelfTestJourneySteps.SameComputer);

    // when completing self test journey
    journey.model.selfTest.cameraWorking = true;
    journey.model.selfTest.microphoneWorking = true;
    journey.model.selfTest.sameComputer = true;
    journey.model.selfTest.seeAndHearClearly = true;

    // and going to
    journey.jumpTo(Steps.ThankYou);

    expect(journey.step).toBe(Steps.ThankYou);
  });
});
