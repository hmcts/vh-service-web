import { JourneyFactory, JOURNEY } from './journey.factory';
import { TestBed } from '@angular/core/testing';
import { JourneyBase } from '../journey-base';

describe('JourneyFactory', () => {
    let factory: JourneyFactory;

    beforeEach(() => {
        const duplicateJourney = jasmine.createSpyObj<JourneyBase>(['handles']);
        duplicateJourney.handles.and.callFake((userType: string) => userType === 'duplicate');

        const properJourney = jasmine.createSpyObj<JourneyBase>(['handles']);
        properJourney.handles.and.callFake((userType: string) => userType === 'proper');

        TestBed.configureTestingModule({
            providers: [
                // Inject one proper handler
                { provide: JOURNEY, useValue: properJourney, multi: true },

                // Inject duplicate handlers for one user type
                { provide: JOURNEY, useValue: duplicateJourney, multi: true },
                { provide: JOURNEY, useValue: duplicateJourney, multi: true },
                JourneyFactory
            ]
        });

        factory = TestBed.get(JourneyFactory);
    });

    it('should raise error if no journeys are found for user type', () => {
        expect(() => factory.getJourney('missing type')).toThrowError('Found not journeys matching user type: missing type');
    });

    it('should raise error if more than one journey exists for user type', () => {
        expect(() => factory.getJourney('duplicate')).toThrowError('Found more than one journey matching user type: duplicate');
    });

    it('should return journey for user type', () => {
        expect(factory.getJourney('proper')).toBeTruthy();
    });
});
