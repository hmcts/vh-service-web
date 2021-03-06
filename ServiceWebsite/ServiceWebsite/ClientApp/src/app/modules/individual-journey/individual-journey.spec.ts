import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

import { IndividualJourney } from './individual-journey';
import { Hearing, SelfTestAnswers } from '../base-journey/participant-suitability.model';
import { ParticipantJourneySteps as Steps, ParticipantJourneySteps } from '../base-journey/participant-journey-steps';
import { DeviceType } from '../base-journey/services/device-type';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from '../base-journey/services/submit.service';
import { TestLogger } from 'src/app/services/logger.spec';

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
        const model = new ParticipantSuitabilityModel();
        model.hearing = new Hearing(id, scheduledDateTime);
        model.selfTest = new SelfTestAnswers();
        return model;
    };

    const getCompletedModel = (id: string, scheduledDateTime: Date = tomorrow) => {
        const model = getModelForHearing(id, scheduledDateTime);
        model.selfTest = new SelfTestAnswers({
            seeAndHearClearly: true,
            checkYourComputer: true,
            cameraWorking: true,
            microphoneWorking: true,
            selfTestResultScore: 'Okay'
        });
        return model;
    };

    const getOnlyCompletedQuestionnaire = (id: string, scheduledDateTime: Date) => {
        const model = getCompletedModel(id, scheduledDateTime);
        model.selfTest = new SelfTestAnswers();
        return model;
    };

    // helper test data
    const suitabilityAnswers = {
        oneUpcomingHearing: () => [getModelForHearing('upcoming hearing id', tomorrow)],
        twoUpcomingHearings: () => [
            getModelForHearing('later upcoming hearing id', dayAfterTomorrow),
            getModelForHearing('earlier upcoming hearing id', tomorrow)
        ],
        alreadyCompleted: () => [getCompletedModel('completed hearing id')],
        completedAndUpcoming: () => [
            getModelForHearing('upcoming hearing id', dayAfterTomorrow),
            getCompletedModel('completed hearing id'),
            getModelForHearing('another upcoming hearing id', tomorrow)
        ],
        withoutSelfTest: () => [getOnlyCompletedQuestionnaire('completed questionnaire', tomorrow)],
        noUpcomingHearings: () => []
    };
    const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
    deviceType.isMobile.and.returnValue(false);

    beforeEach(() => {
        redirected = null;
        journey = new IndividualJourney(submitService, TestLogger);
        journey.redirect.subscribe((s: JourneyStep) => (redirected = s));
    });

    it('should goto video app if there are no upcoming hearings', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.noUpcomingHearings());
        expect(redirected).toBe(Steps.GotoVideoApp);
    });

    it('should stay where it is if trying to enter at the current step', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.oneUpcomingHearing());
        journey.startAt(ParticipantJourneySteps.CheckingVideoHearing);

        const currentStep = redirected;
        redirected = null;

        // when trying to go to the same step
        journey.jumpTo(currentStep);

        // we shouldn't have moved
        expect(redirected).toBeNull();
    });

    it('should stay where it is if model is undefined', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.noUpcomingHearings());
        journey.startAt(Steps.CheckingVideoHearing);

        const currentStep = redirected;
        redirected = null;

        journey.startAt(currentStep);
        journey.jumpTo(currentStep);

        expect(redirected).toBeNull();
    });

    it('should redirect to video app if all upcoming hearings are done', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.alreadyCompleted());
        expect(redirected).toBe(Steps.GotoVideoApp);
    });

    it('should run the journey for the first upcoming hearing', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.twoUpcomingHearings());
        expect(journey.model.hearing.id).toBe('earlier upcoming hearing id');
    });

    it('should run the journey from start for the first upcoming hearing that is not completed', () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.completedAndUpcoming());
        expect(journey.model.hearing.id).toBe('another upcoming hearing id');
        journey.startAt(Steps.CheckingVideoHearing);
        expect(redirected).toBe(Steps.CheckingVideoHearing);
    });

    it(`should redirect go to ${Steps.ThankYou} when having completed self test`, () => {
        journey.forSuitabilityAnswers(suitabilityAnswers.withoutSelfTest());
        journey.startAt(SelfTestJourneySteps.CheckYourComputer);

        // when completing self test journey
        journey.model.selfTest.cameraWorking = true;
        journey.model.selfTest.microphoneWorking = true;
        journey.model.selfTest.checkYourComputer = true;
        journey.model.selfTest.seeAndHearClearly = true;
        journey.model.selfTest.selfTestResultScore = 'Okay';

        // and going to
        journey.jumpTo(Steps.ThankYou);

        expect(journey.step).toEqual(Steps.ThankYou);
    });
});
