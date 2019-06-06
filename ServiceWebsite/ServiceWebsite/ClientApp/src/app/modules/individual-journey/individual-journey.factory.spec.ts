import { SuitabilityService } from './services/suitability.service';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';

describe('IndividualJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<SuitabilityService>;
    let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
    let journey: jasmine.SpyObj<IndividualJourney>;
    let factory: IndividualJourneyFactory;
    const bindings = new JourneyStepComponentBindings();

    beforeEach(() => {
        suitabilityService = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
        suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['initialise']);
        journey = jasmine.createSpyObj<IndividualJourney>(['forSuitabilityAnswers']);
        factory = new IndividualJourneyFactory(journey, suitabilityService, bindings, routingListener);
    });

    it('initialises routing and journey', async () => {
        await factory.begin();
        expect(routingListener.initialise).toHaveBeenCalled();
        expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([]);
    });

    it('handles individual users', () => {
        expect(factory.handles('Individual')).toBeTruthy();
    });
});
