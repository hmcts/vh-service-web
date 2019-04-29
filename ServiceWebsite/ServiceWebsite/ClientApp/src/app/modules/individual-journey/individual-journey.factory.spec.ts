import { SuitabilityService } from './services/suitability.service';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';

describe('IndividualJourneyFactory', () => {
    const client = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
    let journey: jasmine.SpyObj<IndividualJourney>;

    beforeEach(() => {
        journey = jasmine.createSpyObj<IndividualJourney>(['begin']);
        client.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
    });

    it('returns the factory provided by the module', async () => {
        const factory = new IndividualJourneyFactory(journey, client);
        const result = await factory.create();
        expect(result).toBe(journey);
    });

    it('handles individual users', () => {
        const factory = new IndividualJourneyFactory(journey, client);
        expect(factory.handles('Individual')).toBeTruthy();
    });
});
