import { Router } from '@angular/router';
import {
    AuthorizationResult,
    AuthorizedState,
    EventTypes,
    OidcClientNotification,
    PublicEventsService,
    ValidationResult
} from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { Paths } from 'src/app/paths';
import { MockLogger } from 'src/app/testing/mocks/mock-logger';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let routerSpy: jasmine.SpyObj<Router>;
    let eventServiceSpy: jasmine.SpyObj<PublicEventsService>;

    beforeAll(() => {
        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        eventServiceSpy = jasmine.createSpyObj('PublicEventsService', ['registerForEvents']);
    });

    beforeEach(() => {
        component = new HomeComponent(routerSpy, eventServiceSpy, new MockLogger());
        routerSpy.navigate.and.callFake(() => Promise.resolve(true));
    });

    it('should go to navigator if user log in', async () => {
        const eventValue: OidcClientNotification<AuthorizationResult> = {
            type: EventTypes.NewAuthorizationResult,
            value: { isRenewProcess: false, authorizationState: AuthorizedState.Authorized, validationResult: ValidationResult.Ok }
        };

        eventServiceSpy.registerForEvents.and.returnValue(of(eventValue));
        component.ngOnInit();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${Paths.JourneySelector}`]);
    });
    it('unsubcribes from event on destroy', () => {
        component.ngOnInit();
        spyOn(component.eventServiceSubscription$, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.eventServiceSubscription$.unsubscribe).toHaveBeenCalled();
    });
});
