import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { RepresentativeJourneyRoutingListenerService } from './services/representative-journey-routing-listener.service';

describe('RepresentativeJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<RepresentativeSuitabilityService>;
    let routingListener: jasmine.SpyObj<RepresentativeJourneyRoutingListenerService>;
    let journey: jasmine.SpyObj<RepresentativeJourney>;
    let factory: RepresentativeJourneyFactory;

    beforeEach(() => {
        suitabilityService = jasmine.createSpyObj<RepresentativeSuitabilityService>(['getAllSuitabilityAnswers']);
        suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        routingListener = jasmine.createSpyObj<RepresentativeJourneyRoutingListenerService>(['initialise']);
        journey = jasmine.createSpyObj<RepresentativeJourney>(['forSuitabilityAnswers']);
        factory = new RepresentativeJourneyFactory(journey, suitabilityService, routingListener);
    });

    it('initialises routing and journey', async () => {
        await factory.begin();
        expect(routingListener.initialise).toHaveBeenCalled();
        expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([]);
    });

    it('handles individual users', () => {
        expect(factory.handles('Representative')).toBeTruthy();
    });
});
