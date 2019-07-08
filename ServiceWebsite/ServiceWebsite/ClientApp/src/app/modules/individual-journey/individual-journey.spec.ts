import {MutableIndividualSuitabilityModel} from './mutable-individual-suitability.model';
import {IndividualJourney} from './individual-journey';
import {HasAccessToCamera, Hearing} from '../base-journey/participant-suitability.model';
import {IndividualStepsOrderFactory} from './individual-steps-order.factory';
import {IndividualJourneySteps as Steps} from './individual-journey-steps';
import {DeviceType} from '../base-journey/services/device-type';
import {JourneyStep} from '../base-journey/journey-step';
import {SubmitService} from './services/submit.service';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(tomorrow.getDate() + 2);

describe('IndividualJourney', () => {
  let journey: IndividualJourney;
  let redirected: JourneyStep;
  let submitService: jasmine.SpyObj<SubmitService>;
  submitService = jasmine.createSpyObj<SubmitService>(['submit', 'isDropOffPoint', 'updateSubmitModel']);

  const getModelForHearing = (id: string, scheduledDateTime: Date) => {
    const model = new MutableIndividualSuitabilityModel();
    model.hearing = new Hearing(id, scheduledDateTime);
    return model;
  };

  const getCompletedModel = (id: string) => {
    const model = getModelForHearing(id, tomorrow);
    model.aboutYou.answer = false;
    model.consent.answer = true;
    model.camera = HasAccessToCamera.Yes;
    model.computer = true;
    model.internet = true;
    model.interpreter = false;
    model.room = true;
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
      getModelForHearing('upcoming hearing id', tomorrow),
      getCompletedModel('completed hearing id'),
      getModelForHearing('another upcoming hearing id', tomorrow)
    ],
    noUpcomingHearings: () => []
  };
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
  deviceType.isMobile.and.returnValue(false);

  beforeEach(() => {
    redirected = null;
    journey = new IndividualJourney(individualStepsOrderFactory, submitService);
    journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());

    journey.redirect.subscribe((s: JourneyStep) => redirected = s);
  });

  const givenUserIsAtStep = (s: JourneyStep) => {
    journey.jumpTo(s);
  };

  it('should goto video app if there are no upcoming hearings', () => {
    journey.forSuitabilityAnswers(suitabilityAnswers.noUpcomingHearings());
    journey.jumpTo(Steps.AboutHearings);
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
    journey.forSuitabilityAnswers(suitabilityAnswers.twoUpcomingHearings());
    expect(journey.model.hearing.id).toBe('earlier upcoming hearing id');
  });
});
