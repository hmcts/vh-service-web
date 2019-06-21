import { SuitabilityService } from './services/suitability.service';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import {IndividualJourneyService} from './services/individual-journey.service';
import {MutableIndividualSuitabilityModel} from './mutable-individual-suitability.model';

describe('IndividualJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<SuitabilityService>;
    let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
    let individualJourneyService: jasmine.SpyObj<IndividualJourneyService>;
    let journey: jasmine.SpyObj<IndividualJourney>;
    let factory: IndividualJourneyFactory;
    const bindings = new JourneyStepComponentBindings();

    beforeEach(() => {
      suitabilityService = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
      suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
      routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['initialise']);
      journey = jasmine.createSpyObj<IndividualJourney>('journey', ['forSuitabilityAnswers', 'redirect']);
      journey.redirect.subscribe = function () {
      };
      individualJourneyService = jasmine.createSpyObj<IndividualJourneyService>('name', ['get', 'set']);
      factory = new IndividualJourneyFactory(journey, suitabilityService, bindings, routingListener, individualJourneyService);
    });

    it('initialises routing and journey', async () => {
      const model = new MutableIndividualSuitabilityModel();
      individualJourneyService.get.and.returnValue(model);
      await factory.begin();
      expect(routingListener.initialise).toHaveBeenCalled();
      expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([model]);
    });

    it('handles individual users', () => {
        expect(factory.handles('Individual')).toBeTruthy();
    });
});
