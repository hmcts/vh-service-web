import { RepresentativeJourneyFactory } from './representative-journey.factory';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { RepresentativeJourneyStepComponentBindings } from './services/representative-journey-component-bindings';
import { RepresentativeJourneyService } from './services/representative.journey.service';
import SpyObj = jasmine.SpyObj;
import { SelfTestJourneyStepComponentBindings } from '../self-test-journey/self-test-journey-component-bindings';
import { EventEmitter } from '@angular/core';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';
import { ParticipantJourney } from 'src/app/modules/base-journey/participant-journey';
import { SuitabilityService } from '../base-journey/services/suitability.service';

describe('RepresentativeJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<SuitabilityService>;
    let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
    let journey: jasmine.SpyObj<ParticipantJourney>;
    let factory: RepresentativeJourneyFactory;
    const bindings = new RepresentativeJourneyStepComponentBindings(new SelfTestJourneyStepComponentBindings());
    let representativeJourneyService: SpyObj<RepresentativeJourneyService>;

    beforeEach(() => {
        suitabilityService = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
        suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['startRouting', 'startJourneyAtCurrentRoute']);
        journey = {
            redirect: new EventEmitter(),
            ...jasmine.createSpyObj<ParticipantJourney>(['forSuitabilityAnswers', 'continueWithModel'])
        } as jasmine.SpyObj<ParticipantJourney>;

        representativeJourneyService = jasmine.createSpyObj<RepresentativeJourneyService>('name', ['get', 'set']);
        factory = new RepresentativeJourneyFactory(journey, suitabilityService, bindings, routingListener, representativeJourneyService);
    });

    it('continues any previous journey in the session', async () => {
        const model = new ParticipantSuitabilityModel();
        representativeJourneyService.get.and.returnValue(model);
        await factory.begin();
        expect(routingListener.startRouting).toHaveBeenCalled();
        expect(routingListener.startJourneyAtCurrentRoute).toHaveBeenCalled();
    });

    it('handles representative users', () => {
        expect(factory.handles('Representative')).toBeTruthy();
    });

    it('returns the journey model', () => {
        expect(factory.getModel()).toBe(journey.model);
    });
});
