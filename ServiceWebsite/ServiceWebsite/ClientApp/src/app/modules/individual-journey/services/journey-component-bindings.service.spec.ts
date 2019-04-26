import { MutableIndividualSuitabilityModel } from './../mutable-individual-suitability.model';
import { JourneyComponentBindingsService } from './journey-component-bindings.service';
import { IndividualJourney } from '../individual-journey';
import { Router } from '@angular/router';

describe('JourneyComponentBindingsService', () => {
    let bindings: JourneyComponentBindingsService;
    let router: jasmine.SpyObj<Router>;
    let journey = new IndividualJourney(new MutableIndividualSuitabilityModel());

    beforeEach(() => {
        router = jasmine.createSpyObj<Router>(['navigate']);
        bindings = new JourneyComponentBindingsService(router, journey);
    });

    it('should throw error if there is no binding defined for the journey step', () => {
        journey.
    });
});
