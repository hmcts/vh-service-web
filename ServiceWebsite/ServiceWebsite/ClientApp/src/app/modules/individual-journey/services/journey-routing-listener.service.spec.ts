import { Config } from './../../shared/models/config';
import { Subject } from 'rxjs';
import { JourneyRoutingListenerService } from './journey-routing-listener.service';
import { JourneyStepComponentBindings } from './journey-component-bindings';
import { IndividualJourney, IndividualJourneySteps } from '../individual-journey';
import { Router, Event, ResolveEnd } from '@angular/router';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { Paths } from '../paths';
import { DocumentRedirectService } from 'src/app/services/document-redirect.service';

describe('JourneyRoutingListenerService', () => {
    let service: JourneyRoutingListenerService;
    let journey: IndividualJourney;
    let router: jasmine.SpyObj<Router>;
    let routerEvents: Subject<Event>;
    let redirectService: jasmine.SpyObj<DocumentRedirectService>;
    const config = new Config('videourl', 'appinsightskey');

    beforeEach(() => {
        redirectService = jasmine.createSpyObj<DocumentRedirectService>(['to']);

        routerEvents = new Subject();
        router = {
            ...jasmine.createSpyObj<Router>(['navigate']),
            events: routerEvents.asObservable()
        } as jasmine.SpyObj<Router>;

        journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
        service = new JourneyRoutingListenerService(
            journey,
            router,
            new JourneyStepComponentBindings(),
            config,
            redirectService
        );
        service.initialise();
    });

    it('should redirect to video app when there are not upcoming hearings', () => {
        journey.withNoUpcomingHearings();
        journey.begin();

        expect(redirectService.to).toHaveBeenCalledWith(config.videoAppUrl);
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
