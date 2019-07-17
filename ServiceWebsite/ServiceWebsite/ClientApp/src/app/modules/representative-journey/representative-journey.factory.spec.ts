import {RepresentativeSuitabilityService} from './services/representative-suitability.service';
import {RepresentativeJourneyFactory} from './representative-journey.factory';
import {RepresentativeJourney} from './representative-journey';
import {JourneyRoutingListenerService} from '../base-journey/services/journey-routing-listener.service';
import {RepresentativeJourneyStepComponentBindings} from './services/representative-journey-component-bindings';
import {RepresentativeJourneyService} from './services/representative.journey.service';
import {MutableRepresentativeSuitabilityModel} from './mutable-representative-suitability.model';
import SpyObj = jasmine.SpyObj;
import { SelfTestJourneyStepComponentBindings } from '../self-test-journey/self-test-journey-component-bindings';
import { EventEmitter } from '@angular/core';

describe('RepresentativeJourneyFactory', () => {
  let suitabilityService: jasmine.SpyObj<RepresentativeSuitabilityService>;
  let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
  let journey: jasmine.SpyObj<RepresentativeJourney>;
  let factory: RepresentativeJourneyFactory;
  const bindings = new RepresentativeJourneyStepComponentBindings(new SelfTestJourneyStepComponentBindings());
  let representativeJourneyService: SpyObj<RepresentativeJourneyService>;

  beforeEach(() => {
    suitabilityService = jasmine.createSpyObj<RepresentativeSuitabilityService>(['getAllSuitabilityAnswers']);
    suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
    routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['startRouting', 'startJourneyAtCurrentRoute']);
    journey = {
      redirect: new EventEmitter,
      ...jasmine.createSpyObj<RepresentativeJourney>(['forSuitabilityAnswers', 'continueWithModel'])
    } as jasmine.SpyObj<RepresentativeJourney>;

    representativeJourneyService = jasmine.createSpyObj<RepresentativeJourneyService>('name', ['get', 'set']);
    factory = new RepresentativeJourneyFactory(journey, suitabilityService, bindings, routingListener, representativeJourneyService);
  });

  it('continues any previous journey in the session', async () => {
    const model = new MutableRepresentativeSuitabilityModel();
    representativeJourneyService.get.and.returnValue(model);
    await factory.begin();
    expect(routingListener.startRouting).toHaveBeenCalled();
    expect(routingListener.startJourneyAtCurrentRoute).toHaveBeenCalled();
    expect(journey.continueWithModel).toHaveBeenCalledWith(model);
  });

  it('handles representative users', () => {
    expect(factory.handles('Representative')).toBeTruthy();
  });

  it('returns the journey model', () => {
    expect(factory.getModel()).toBe(journey.model);
  });
});
