import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { JourneySelector, JOURNEY_FACTORY } from './journey.selector';
import { TestBed } from '@angular/core/testing';
import { ExploreCourtBuildingComponent } from '../../individual-journey/pages/explore-court-building/explore-court-building.component';
import { ParticipantSuitabilityModel } from '../participant-suitability.model';

describe('JourneySelector', () => {
    let selector: JourneySelector;
    let properJourneyFactory: jasmine.SpyObj<JourneyFactory>;

    beforeEach(() => {
        const duplicateJourneyFactory = jasmine.createSpyObj<JourneyFactory>(['handles', 'begin']);
        duplicateJourneyFactory.handles.and.callFake((userType: string) => userType === 'duplicate');

        properJourneyFactory = jasmine.createSpyObj<JourneyFactory>(['handles', 'begin', 'getModel']);
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

        selector = TestBed.inject(JourneySelector);
    });

    it('should raise error if no journeys are found for user type', async () => {
        let error: any;
        try {
            await selector.beginFor('missing type');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found no journeys matching user type: missing type');
    });

    it('should raise error if more than one journey exists for user type', async () => {
        let error: any;
        try {
            await selector.beginFor('duplicate');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found more than one journey matching user type: duplicate');
    });

    it('should return journey for user type', async () => {
        await selector.beginFor('proper');
        expect(properJourneyFactory.begin).toHaveBeenCalled();
    });

    it('cannot return journey or model before being started', () => {
        expect(() => selector.getModel()).toThrowError('Journey has not been started yet');
        expect(() => selector.getJourney()).toThrowError('Journey has not been started yet');
    });

    it('can retrieve current journey and model after beginning', async () => {
        const fakeJourney = jasmine.createSpyObj<JourneyBase>(['next']);
        const fakeModel = {} as ParticipantSuitabilityModel;
        properJourneyFactory.getModel.and.returnValue(fakeModel);
        properJourneyFactory.begin.and.returnValue(Promise.resolve(fakeJourney));

        await selector.beginFor('proper');
        const actualJourney = selector.getJourney();
        const actualModel = selector.getModel();

        expect(actualJourney).toBe(fakeJourney);
        expect(actualModel).toBe(fakeModel);
    });
});
