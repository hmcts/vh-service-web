import {RepresentativeSuitabilityService} from './services/representative-suitability.service';
import {RepresentativeJourneyFactory} from './representative-journey.factory';
import {RepresentativeJourney} from './representative-journey';
import {JourneyRoutingListenerService} from '../base-journey/services/journey-routing-listener.service';
import {RepresentativeJourneyStepComponentBindings} from './services/representative-journey-component-bindings';
import {RepresentativeJourneyService} from './services/representative.journey.service';
import {MutableRepresentativeSuitabilityModel} from './mutable-representative-suitability.model';
import SpyObj = jasmine.SpyObj;

describe('RepresentativeJourneyFactory', () => {
  let suitabilityService: jasmine.SpyObj<RepresentativeSuitabilityService>;
  let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  let factory: RepresentativeJourneyFactory;
  const bindings = new RepresentativeJourneyStepComponentBindings();
  let representativeJourneyService: SpyObj<RepresentativeJourneyService>;

  beforeEach(() => {
    suitabilityService = jasmine.createSpyObj<RepresentativeSuitabilityService>(['getAllSuitabilityAnswers']);
    suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
    routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['initialise']);
    journey = jasmine.createSpyObj<RepresentativeJourney>('journey', ['forSuitabilityAnswers', 'redirect']);
    journey.redirect.subscribe = function () {
    };
    representativeJourneyService = jasmine.createSpyObj<RepresentativeJourneyService>('name', ['get', 'set']);
    factory = new RepresentativeJourneyFactory(journey, suitabilityService, bindings, routingListener, representativeJourneyService);
  });

  it('initialises routing and journey', async () => {
    const model = new MutableRepresentativeSuitabilityModel();
    representativeJourneyService.get.and.returnValue(model);
    await factory.begin();
    expect(routingListener.initialise).toHaveBeenCalled();
    expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([model]);
  });

  it('handles representative users', () => {
    expect(factory.handles('Representative')).toBeTruthy();
  });
});
