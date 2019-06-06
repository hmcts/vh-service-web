import { RepresentativeSuitabilityService } from './services/representative-suitability.service';
import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { RepresentativeJourney } from './representative-journey';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';

describe('RepresentativeJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<RepresentativeSuitabilityService>;
    let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
    let journey: jasmine.SpyObj<RepresentativeJourney>;
    let factory: RepresentativeJourneyFactory;
    const bindings = new RepresentativeJourneyStepComponentBindings();

    beforeEach(() => {
        suitabilityService = jasmine.createSpyObj<RepresentativeSuitabilityService>(['getAllSuitabilityAnswers']);
        suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['initialise']);
        journey = jasmine.createSpyObj<RepresentativeJourney>(['forSuitabilityAnswers']);
        factory = new RepresentativeJourneyFactory(journey, suitabilityService, bindings, routingListener);
    });

    it('initialises routing and journey', async () => {
        await factory.begin();
        expect(routingListener.initialise).toHaveBeenCalled();
        expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([]);
    });

    it('handles representative users', () => {
        expect(factory.handles('Representative')).toBeTruthy();
    });
});
