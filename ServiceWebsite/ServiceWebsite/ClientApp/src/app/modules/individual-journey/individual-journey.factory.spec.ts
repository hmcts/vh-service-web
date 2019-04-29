import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';

describe('IndividualJourneyFactory', () => {
    it('returns the factory provided by the module', async () => {
        const journey = jasmine.createSpyObj<IndividualJourney>(['begin']);
        const factory = new IndividualJourneyFactory(journey);
        const result = await factory.create('user');
        expect(result).toBe(journey);
    });

    it('handles individual users', () => {
        const factory = new IndividualJourneyFactory(null);
        expect(factory.handles('Individual')).toBeTruthy();
    });
});
