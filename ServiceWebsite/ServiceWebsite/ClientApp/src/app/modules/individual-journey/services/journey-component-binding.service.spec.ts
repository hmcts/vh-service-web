import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { JourneyComponentBindingsService as JourneyComponentBindingService } from './journey-component-binding.service';
import { IndividualJourney, IndividualJourneySteps } from '../individual-journey';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

describe('JourneyComponentBindingsService', () => {
    let bindings: JourneyComponentBindingService;
    let router: jasmine.SpyObj<Router>;
    let journey: IndividualJourney;
    let redirectedStep: IndividualJourneySteps;

    beforeEach(() => {
        router = jasmine.createSpyObj<Router>(['navigate']);
        journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
        journey.redirect.subscribe((step: IndividualJourneySteps) => redirectedStep = step);
        bindings = new JourneyComponentBindingService(router, journey);
    });

    it('redirects to mapped component when step changes', () => {
        journey.begin();
        journey.next();
        expect(router.navigate).toHaveBeenCalled();
    });

    it('jumps to step if navigated to a component', () => {
        
    });

    // it('should throw error if there is no binding defined for the journey step', () => {
    //     expect(() => stepChangedEvent.emit(100)).toThrowError('error');
    // });
});
