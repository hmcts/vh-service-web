import { EventEmitter } from '@angular/core';
import { SuitabilityService } from '../base-journey/services/suitability.service';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney } from './individual-journey';
import { JourneyRoutingListenerService } from '../base-journey/services/journey-routing-listener.service';
import { JourneyStepComponentBindings } from './services/journey-component-bindings';
import { IndividualJourneyService } from './services/individual-journey.service';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

import { SelfTestJourneyStepComponentBindings } from '../self-test-journey/self-test-journey-component-bindings';

describe('IndividualJourneyFactory', () => {
    let suitabilityService: jasmine.SpyObj<SuitabilityService>;
    let routingListener: jasmine.SpyObj<JourneyRoutingListenerService>;
    let individualJourneyService: jasmine.SpyObj<IndividualJourneyService>;
    let journey: jasmine.SpyObj<IndividualJourney>;
    let factory: IndividualJourneyFactory;
    const bindings = new JourneyStepComponentBindings(new SelfTestJourneyStepComponentBindings());

    beforeEach(() => {
        suitabilityService = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
        suitabilityService.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        routingListener = jasmine.createSpyObj<JourneyRoutingListenerService>(['startRouting', 'startJourneyAtCurrentRoute']);
        journey = {
            redirect: new EventEmitter(),
            ...jasmine.createSpyObj<IndividualJourney>(['forSuitabilityAnswers'])
        } as jasmine.SpyObj<IndividualJourney>;

        individualJourneyService = jasmine.createSpyObj<IndividualJourneyService>('name', ['get', 'set']);
        factory = new IndividualJourneyFactory(journey, suitabilityService, bindings, routingListener, individualJourneyService);
    });

    it('initialises routing and journey', async () => {
        const model = new ParticipantSuitabilityModel();
        individualJourneyService.get.and.returnValue(model);
        await factory.begin();
        expect(routingListener.startRouting).toHaveBeenCalled();
        expect(routingListener.startJourneyAtCurrentRoute).toHaveBeenCalled();
        expect(journey.forSuitabilityAnswers).toHaveBeenCalledWith([model]);
    });

    it('handles individual users', () => {
        expect(factory.handles('Individual')).toBeTruthy();
    });

    it('returns the journey model', () => {
        expect(factory.getModel()).toBe(journey.model);
    });
});
