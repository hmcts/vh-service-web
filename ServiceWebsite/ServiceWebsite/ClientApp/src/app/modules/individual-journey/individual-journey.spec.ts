import {MutableIndividualSuitabilityModel} from './mutable-individual-suitability.model';
import {IndividualJourney} from './individual-journey';
import {HasAccessToCamera, Hearing} from '../base-journey/participant-suitability.model';
import {IndividualStepsOrderFactory} from './individual-steps-order.factory';
import {IndividualJourneySteps as Steps} from './individual-journey-steps';
import {DeviceType} from '../base-journey/services/device-type';
import {JourneyStep} from '../base-journey/journey-step';
import {SubmitService} from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';

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

  const whenProceeding = () => {
    journey.next();
  };

  const whenFailingTheStep = () => {
    journey.fail();
  };

  const givenUserIsAtStep = (s: JourneyStep) => {
    journey.jumpTo(s);
  };

  const nextStepIs = (expectedStep: JourneyStep) => {
    whenProceeding();
    expect(redirected).toBe(expectedStep);
  };

  it('should follow the happy path journey', () => {
    // given we're starting at the beginning
    journey.startAt(IndividualJourney.initialStep);

    // then the happy path journey would be
    nextStepIs(Steps.DifferentHearingTypes);
    nextStepIs(Steps.ExploreCourtBuilding);
    nextStepIs(Steps.CourtInformationVideo);
    nextStepIs(Steps.ExploreVideoHearing);
    nextStepIs(Steps.AccessToCameraAndMicrophone);
    nextStepIs(Steps.HearingAsParticipant);
    nextStepIs(Steps.HelpTheCourtDecide);
    nextStepIs(Steps.AboutYou);
    nextStepIs(Steps.Interpreter);
    nextStepIs(Steps.AccessToComputer);
    nextStepIs(Steps.AboutYourComputer);
    nextStepIs(Steps.YourInternetConnection);
    nextStepIs(Steps.AccessToRoom);
    nextStepIs(Steps.Consent);

    // self test
    nextStepIs(SelfTestJourneySteps.SameComputer);
    nextStepIs(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
    nextStepIs(SelfTestJourneySteps.SelfTest);
    nextStepIs(SelfTestJourneySteps.CameraWorking);
    nextStepIs(SelfTestJourneySteps.MicrophoneWorking);
    nextStepIs(SelfTestJourneySteps.SeeAndHearVideo);

    // this last step is pending change, will proceed to self test in the future
    nextStepIs(Steps.ThankYou);
  });

  const expectDropOffToThankYouFrom = (s: JourneyStep) => {
    givenUserIsAtStep(s);
    whenFailingTheStep();
    expect(redirected).toBe(Steps.ThankYou);
  };

  it(`should continue to ${Steps.ThankYou} if individual has no access to a computer`, () => {
    givenUserIsAtStep(Steps.AccessToComputer);
    journey.model.computer = false;
    journey.next();
    expectDropOffToThankYouFrom(Steps.AccessToComputer);
  });

  it(`should continue to ${Steps.ThankYou} if individual has no access to a camera or microphone`, () => {
    givenUserIsAtStep(Steps.AboutYourComputer);
    journey.model.camera = HasAccessToCamera.No;
    journey.next();
    expectDropOffToThankYouFrom(Steps.AboutYourComputer);
  });

  it(`should continue to ${Steps.ThankYou} if individual has no access to an internet connection`, () => {
    givenUserIsAtStep(Steps.YourInternetConnection);
    journey.model.internet = false;
    journey.next();
    expectDropOffToThankYouFrom(Steps.YourInternetConnection);
  });

  it(`should continue to ${Steps.ThankYou} if individual has selected no to a video hearing`, () => {
    givenUserIsAtStep(Steps.Consent);
    journey.next();
    expectDropOffToThankYouFrom(Steps.Consent);
  });

  it(`should continue to ${Steps.MediaAccessError} if failing ${Steps.AccessToCameraAndMicrophone}`, () => {
    givenUserIsAtStep(Steps.AccessToCameraAndMicrophone);
    journey.model.mediaAccepted = false;
    journey.next();
    expect(redirected).toBe(Steps.MediaAccessError);
  });

  it('should raise an error on unexpected failure transition', () => {
    givenUserIsAtStep(Steps.AboutHearings);
    expect(() => whenFailingTheStep())
      .toThrowError(`Missing/unexpected failure for step: ${Steps.AboutHearings}`);
  });

  it('should raise an error on missing transition', () => {
    givenUserIsAtStep(Steps.ThankYou);
    expect(() => whenProceeding())
      .toThrowError(`Missing transition for step: ${Steps.ThankYou}`);
  });

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

  it('should throw exception if trying to enter or proceed journey without having been initialised', () => {
    // given a journey that's not been initialised
    const uninitialisedJourney = new IndividualJourney(individualStepsOrderFactory, submitService);
    const expectedError = 'Journey must be initialised with suitability answers';
    expect(() => uninitialisedJourney.jumpTo(Steps.HearingAsParticipant)).toThrowError(expectedError);
    expect(() => uninitialisedJourney.next()).toThrowError(expectedError);
  });

  it('should throw an exception if proceeding without having entered the journey', () => {
    expect(() => journey.next()).toThrowError('Journey must be entered before navigation is allowed');
  });

  it(`should continue to ${Steps.ThankYou} if individual has already submitted`, () => {
    givenUserIsAtStep(Steps.YourInternetConnection);
    submitService.isDropOffPoint.and.returnValue(true);
    journey.next();
    expect(redirected).toBe(Steps.ThankYou);

    journey.redirect.emit(Steps.YourInternetConnection);
    expect(redirected).toBe(Steps.YourInternetConnection);

    submitService.isDropOffPoint.and.returnValue(false);
    journey.next();
    expect(redirected).toBe(Steps.ThankYou);
  });

  it(`should continue to ${Steps.AccessToRoom} if individual has not submitted`, () => {
    givenUserIsAtStep(Steps.YourInternetConnection);
    submitService.isDropOffPoint.and.returnValue(false);
    journey.next();
    expect(redirected).toBe(Steps.AccessToRoom);

    journey.redirect.emit(Steps.YourInternetConnection);
    expect(redirected).toBe(Steps.YourInternetConnection);

    journey.next();
    expect(redirected).toBe(Steps.AccessToRoom);
  });
});
