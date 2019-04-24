import { IndividualJourney, IndividualJourneySteps as Steps, IndividualJourneySteps } from './individual-journey';

describe('IndividualJourney', () => {
    let journey: IndividualJourney;
    let redirected: Steps;

    beforeEach(() => {
        redirected = null;
        journey = new IndividualJourney();

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

    it(`should continue to ${Steps.ThankYou} if failing questions on ${Steps.AccessToComputer}`, () => {
        expectDropOffToThankYouFrom(Steps.AccessToComputer);
    });

    it(`should continue to ${Steps.ThankYou} if failing questions on ${Steps.AboutYourComputer}`, () => {
        expectDropOffToThankYouFrom(Steps.AccessToComputer);
    });

    it(`should continue to ${Steps.ThankYou} if failing questions on ${Steps.YourInternetConnection}`, () => {
        expectDropOffToThankYouFrom(Steps.YourInternetConnection);
    });

    it(`should continue to ${Steps.ThankYou} if failing questions on ${Steps.Consent}`, () => {
        expectDropOffToThankYouFrom(Steps.Consent);
    });

    it(`should continue to ${Steps.MediaAccessError} if failing ${Steps.AccessToCameraAndMicrophone}`, () => {
        givenUserIsAtStep(Steps.AccessToCameraAndMicrophone);

        whenFailingTheStep();

        expectStep(redirected).toBe(step(Steps.MediaAccessError));
    })

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
});
