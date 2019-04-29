import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { JourneySelector, JOURNEY_FACTORY } from './journey.selector';
import { TestBed, async } from '@angular/core/testing';
import { JourneyBase } from '../journey-base';

describe('JourneyFactory', () => {
    let selector: JourneySelector;
    let properJourneyFactory: jasmine.SpyObj<JourneyFactory>;

    beforeEach(() => {
        const duplicateJourneyFactory = jasmine.createSpyObj<JourneyFactory>(['handles', 'create']);
        duplicateJourneyFactory.handles.and.callFake((userType: string) => userType === 'duplicate');

        properJourneyFactory = jasmine.createSpyObj<JourneyFactory>(['handles', 'create']);
        properJourneyFactory.handles.and.callFake((userType: string) => userType === 'proper');

        TestBed.configureTestingModule({
            providers: [
                // Inject one proper handler
                { provide: JOURNEY_FACTORY, useValue: properJourneyFactory, multi: true },

                // Inject duplicate handlers for one user type
                { provide: JOURNEY_FACTORY, useValue: duplicateJourneyFactory, multi: true },
                { provide: JOURNEY_FACTORY, useValue: duplicateJourneyFactory, multi: true },
                JourneySelector
            ]
        });

        selector = TestBed.get(JourneySelector);
    });

    it('should raise error if no journeys are found for user type', async () => {
        let error: any;
        try {
            await selector.getJourney('missing type');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found no journeys matching user type: missing type');
    });

    it('should raise error if more than one journey exists for user type', async () => {
        let error: any;
        try {
            await selector.getJourney('duplicate');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found more than one journey matching user type: duplicate');
    });

    it('should return journey for user type', async () => {
        const journey = jasmine.createSpyObj<JourneyBase>(['begin']);
        properJourneyFactory.create.and.returnValue(Promise.resolve(journey));

        expect(await selector.getJourney('proper')).toBe(journey);
    });
});
