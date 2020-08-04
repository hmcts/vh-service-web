import { NavigationBackFactory } from 'src/app/modules/base-journey/services/navigation-back.factory';
import { NavigationBackSelector, NAVIGATION_BACK_FACTORY } from './navigation-back.selector';
import { TestBed } from '@angular/core/testing';

describe('NavigationBackSelector', () => {
    let selector: NavigationBackSelector;
    let navigationFactory: jasmine.SpyObj<NavigationBackFactory>;

    beforeEach(() => {
        const duplicateFactory = jasmine.createSpyObj<NavigationBackFactory>(['handles', 'subscribeToEvent']);
        duplicateFactory.handles.and.callFake((userType: string) => userType === 'duplicate');

        navigationFactory = jasmine.createSpyObj<NavigationBackFactory>(['handles', 'subscribeToEvent']);
        navigationFactory.handles.and.callFake((userType: string) => userType === 'proper');

        TestBed.configureTestingModule({
            providers: [
                // Inject one proper handler
                { provide: NAVIGATION_BACK_FACTORY, useValue: navigationFactory, multi: true },

                // Inject duplicate handlers for one user type
                { provide: NAVIGATION_BACK_FACTORY, useValue: duplicateFactory, multi: true },
                { provide: NAVIGATION_BACK_FACTORY, useValue: duplicateFactory, multi: true },
                NavigationBackSelector
            ]
        });

        selector = TestBed.inject(NavigationBackSelector);
    });

    it('should raise error if no navigation back are found for user type', async () => {
        let error: any;
        try {
            await selector.beginFor('missing type');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found no navigation back matching user type: missing type');
    });

    it('should raise error if more than one navigation back exists for user type', async () => {
        let error: any;
        try {
            await selector.beginFor('duplicate');
        } catch (e) {
            error = e.message;
        }

        expect(error).toBe('Found more than one navigation back matching user type: duplicate');
    });

    it('should return navigation back for user type', async () => {
        await selector.beginFor('proper');
        expect(navigationFactory.subscribeToEvent).toHaveBeenCalled();
    });
});
