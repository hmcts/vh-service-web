import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';
import { IndividualJourney, IndividualJourneySteps as Steps, IndividualJourneySteps } from './individual-journey';
import { HasAccessToCamera } from './individual-suitability.model';

describe('IndividualJourney', () => {
    let journey: IndividualJourney;
    let redirected: Steps;

    beforeEach(() => {
        redirected = null;
        journey = new IndividualJourney(new MutableIndividualSuitabilityModel());

        journey.redirect.subscribe((s: Steps) => redirected = s);
    });

    const whenProceeding = () => {
        journey.next();
    };

    const whenFailingTheStep = () => {
        journey.fail();
    };

    const givenUserIsAtStep = (s: IndividualJourneySteps) => {
        journey.jumpTo(s);
    };

    const expectStep = (s: IndividualJourneySteps): jasmine.ArrayLikeMatchers<string> => {
        return expect(IndividualJourneySteps[s]);
    };

    const step = (s: IndividualJourneySteps): string => {
        return IndividualJourneySteps[s];
    };

    const nextStepIs = (expectedStep: IndividualJourneySteps) => {
        whenProceeding();
        expectStep(redirected).toBe(step(expectedStep));
    };

    it(`should begin at ${Steps.AboutHearings}`, () => {
        // when beginning journey
        journey.begin();

        expectStep(redirected).toBe(step(Steps.AboutHearings));
    });

    it('should follow the happy path journey', () => {
        // when beginning journey
        journey.begin();

        // then the happy path journey would be
        nextStepIs(Steps.DifferentHearingTypes);
        nextStepIs(Steps.ExploreCourtBuilding);
        nextStepIs(Steps.CourtInformationVideo);
        nextStepIs(Steps.AccessToCameraAndMicrophone);
        nextStepIs(Steps.HearingAsParticipant);
        nextStepIs(Steps.HearingAsJudge);
        nextStepIs(Steps.HelpTheCourtDecide);
        nextStepIs(Steps.AboutYou);
        nextStepIs(Steps.Interpreter);
        nextStepIs(Steps.AccessToComputer);
        nextStepIs(Steps.AboutYourComputer);
        nextStepIs(Steps.YourInternetConnection);
        nextStepIs(Steps.AccessToRoom);
        nextStepIs(Steps.Consent);

        // this last step is pending change, will proceed to self test in the future
        nextStepIs(Steps.ThankYou);
    });

    const expectDropOffToThankYouFrom = (s: IndividualJourneySteps) => {
        givenUserIsAtStep(s);
        whenFailingTheStep();
        expectStep(redirected).toBe(step(Steps.ThankYou));
    };

    it(`should continue to ${Steps.ThankYou} if individual has no access to a computer`, () => {
        givenUserIsAtStep(Steps.AccessToComputer);
        journey.model.camera === HasAccessToCamera.No;
        journey.next();
        expectDropOffToThankYouFrom(Steps.AccessToComputer);
    });

    it(`should continue to ${Steps.ThankYou} if individual has no access to a camera or microphone`, () => {
        givenUserIsAtStep(Steps.AccessToCameraAndMicrophone);
        journey.model.computer === false;
        journey.next();
        expectDropOffToThankYouFrom(Steps.AccessToComputer);
    });

    it(`should continue to ${Steps.ThankYou} if individual has no access to an internet connection`, () => {
        givenUserIsAtStep(Steps.YourInternetConnection);
        journey.model.internet === false;
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

        whenFailingTheStep();

        expectStep(redirected).toBe(step(Steps.MediaAccessError));
    });

    it('should raise an error on unexpected failure transition', () => {
        givenUserIsAtStep(Steps.AboutHearings);
        expect(() => whenFailingTheStep())
            .toThrowError(`Missing/unexpected failure for step: ${IndividualJourneySteps[Steps.AboutHearings]}`);
    });

    it('should raise an error on missing transition', () => {
        givenUserIsAtStep(Steps.ThankYou);
        expect(() => whenProceeding())
            .toThrowError(`Missing transition for step: ${IndividualJourneySteps[Steps.ThankYou]}`);
    });

    it('should stay where it is if trying to jump to the current step', () => {
        // given we're on the first step
        journey.begin();
        const currentStep = redirected;
        redirected = null;

        // when trying to go to the same step
        journey.jumpTo(currentStep);

        // we shouldn't have moved
        expect(redirected).toBeNull();
    });
});
