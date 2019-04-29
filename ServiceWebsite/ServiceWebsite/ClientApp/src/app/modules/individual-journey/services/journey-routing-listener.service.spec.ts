import { Subject } from 'rxjs';
import { JourneyRoutingListenerService } from './journey-routing-listener.service';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney, IndividualJourneySteps } from '../individual-journey';
import { Router, Event, ResolveEnd } from '@angular/router';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Paths } from '../paths';

describe('JourneyRoutingListenerService', () => {
    let service: JourneyRoutingListenerService;
    let journey: IndividualJourney;
    let router: jasmine.SpyObj<Router>;
    let routerEvents: Subject<Event>;

    beforeEach(() => {
        routerEvents = new Subject();
        router = {
            ...jasmine.createSpyObj<Router>(['navigate']),
            events: routerEvents.asObservable()
        } as jasmine.SpyObj<Router>;

        journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
        service = new JourneyRoutingListenerService(journey, router, new JourneyStepComponentBindings());
        service.initialise();
    });

    it('should navigate to mapped route on journey step change', () => {
        journey.begin();
        expect(router.navigate).toHaveBeenCalled();
    });

    it('should jump to step when navigated', () => {
        routerEvents.next(new ResolveEnd(0, `/${Paths.Consent}`, null, null));
        expect(IndividualJourneySteps[journey.step]).toBe(IndividualJourneySteps[IndividualJourneySteps.Consent]);
    });
});
