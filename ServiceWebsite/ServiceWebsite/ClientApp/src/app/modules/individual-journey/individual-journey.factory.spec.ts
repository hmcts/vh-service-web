import { ApiClient } from './../../services/clients/api-client';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';

describe('IndividualJourneyFactory', () => {
    const client = jasmine.createSpyObj<ApiClient>(['get']);
    let journey: jasmine.SpyObj<IndividualJourney>;

    beforeEach(() => {
        journey = jasmine.createSpyObj<IndividualJourney>(['begin']);
    })

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
