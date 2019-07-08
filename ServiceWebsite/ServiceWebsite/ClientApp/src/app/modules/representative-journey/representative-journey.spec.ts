import { MutableRepresentativeSuitabilityModel } from './mutable-representative-suitability.model';
import { RepresentativeJourney } from './representative-journey';
import { HasAccessToCamera, Hearing } from '../base-journey/participant-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps as Steps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';

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
    return model;
  };

  const getCompletedModel = (id: string) => {
    const model = getModelForHearing(id, tomorrow);
    model.aboutYou.answer = false;
    model.aboutYourClient.answer = true;
    model.hearingSuitability.answer = true;
    model.clientAttendance = true;
    model.camera = HasAccessToCamera.Yes;
    model.computer = true;
    model.room = true;
    return model;
  };

  // helper test data
  const suitabilityAnswers = {
    oneUpcomingHearing: [
      getModelForHearing('upcoming hearing id', tomorrow)
    ],
    twoUpcomingHearings: [
      getModelForHearing('later upcoming hearing id', dayAfterTomorrow),
      getModelForHearing('earlier upcoming hearing id', tomorrow)
    ],
    alreadyCompleted: [
      getCompletedModel('completed hearing id')
    ],
    completedAndUpcoming: [
      getModelForHearing('upcoming hearing id', tomorrow),
      getCompletedModel('completed hearing id'),
      getModelForHearing('another upcoming hearing id', tomorrow)
    ],
    noUpcomingHearings: []
  };
  const representativeStepsOrderFactory = new RepresentativeStepsOrderFactory();

  beforeEach(() => {
    redirected = null;
    journey = new RepresentativeJourney(representativeStepsOrderFactory, submitService);
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing);

    journey.redirect.subscribe((s: JourneyStep) => redirected = s);
  });

  const givenUserIsAtStep = (s: JourneyStep) => {
    journey.jumpTo(s);
  };

  it('should goto video app if there are no upcoming hearings', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.noUpcomingHearings);
    journey.jumpTo(Steps.AboutVideoHearings);
    expect(redirected).toBe(Steps.GotoVideoApp);
  });

  it('should goto video app if trying to enter a finished journey', () => {
    // given journey that's finished
    journey.forSuitabilityAnswers(suitabilityAnswers.alreadyCompleted);

    // when trying to enter later in the journey
    journey.jumpTo(Steps.ClientAttendance);
    expect(redirected).toBe(Steps.GotoVideoApp);
  });

  it('should stay where it is if trying to enter at the current step', () => {
    const currentStep = redirected;
    redirected = null;

    // when trying to go to the same step
    journey.jumpTo(currentStep);

    // we shouldn't have moved
    expect(redirected).toBeNull();
  });

  it('should run the story for the first upcoming hearing', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.twoUpcomingHearings);
    expect(journey.model.hearing.id).toBe('earlier upcoming hearing id');
  });

  it('should redirect fo video app if any suitability answers have been answered', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.completedAndUpcoming);
    journey.jumpTo(Steps.AboutVideoHearings);
    expect(redirected).toBe(Steps.GotoVideoApp);
  });
});
