import { IndividualJourney, IndividualJourneySteps as Steps } from './individual-journey';

describe('IndividualJourney', () => {
    let journey: IndividualJourney;
    let redirected: Steps = null;

    beforeAll(() => {
        journey = new IndividualJourney();

        journey.redirect.subscribe((step: Steps) => redirected = step);
    });

    const givenJourneyIsAt = (position: Steps) => {
        journey.jumpTo(position);
    };

    const whenProceeding = () => {
        journey.next();
    };

    it(`should begin at ${Steps.AboutHearings}`, () => {
        // when beginning journey
        journey.begin();

        expect(redirected).toBe(Steps.AboutHearings);
    });

    it('should proceed to [explanatory video] after [about hearings]', () => {
        givenJourneyIsAt(Steps.AboutHearings);

        whenProceeding();

        expect(redirected).toBe(Steps.InformationVideo);
    });
});
