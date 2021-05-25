import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { JourneySelector } from '../modules/base-journey/services/journey.selector';
import { NavigationBackSelector } from '../modules/base-journey/services/navigation-back.selector';
import { PageUrls } from '../modules/shared/constants/page-url.constants';
import { Config } from '../modules/shared/models/config';
import { WindowLocation, WindowRef } from '../modules/shared/window-ref';
import { ConfigService } from '../services/config.service';
import { DocumentRedirectService } from '../services/document-redirect.service';
import { ProfileService } from '../services/profile.service';
import { MockLogger } from '../testing/mocks/mock-logger';
import { JourneySelectorComponent } from './journey-selector.component';

describe('JourneySelectorComponentComponent', () => {
    let component: JourneySelectorComponent;

    let window: jasmine.SpyObj<WindowRef>;
    let router: jasmine.SpyObj<Router>;
    let profileService: jasmine.SpyObj<ProfileService>;
    let configService: jasmine.SpyObj<ConfigService>;
    let redirect: jasmine.SpyObj<DocumentRedirectService>;
    let navigationBackSelector: jasmine.SpyObj<NavigationBackSelector>;
    let journeySelector: jasmine.SpyObj<JourneySelector>;

    beforeAll(() => {
        const clientSettings = new Config();
        clientSettings.tenant_id = 'tenantid';
        clientSettings.client_id = 'clientid';
        clientSettings.post_logout_redirect_uri = '/';
        clientSettings.redirect_uri = '/';

        configService = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings', 'loadConfig']);
        configService.getClientSettings.and.returnValue(of(clientSettings));

        profileService = jasmine.createSpyObj<ProfileService>(['getUserProfile']);

        router = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);

        journeySelector = jasmine.createSpyObj<JourneySelector>(['beginFor']);
        navigationBackSelector = jasmine.createSpyObj<NavigationBackSelector>(['beginFor']);
        redirect = jasmine.createSpyObj<DocumentRedirectService>(['to']);

        window = jasmine.createSpyObj('WindowRef', ['getLocation']);
        window.getLocation.and.returnValue(new WindowLocation('/url'));
    });

    beforeEach(() => {
        component = new JourneySelectorComponent(
            configService,
            router,
            profileService,
            journeySelector,
            redirect,
            navigationBackSelector,
            new MockLogger()
        );
    });

    it('should redirect to unauthorised if user does not have profile', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve(undefined));

        component.ngOnInit();
        flushMicrotasks();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual(PageUrls.Unauthorised);
    }));

    it('should redirect to unauthorised if user does not have profile email', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: undefined }));

        component.ngOnInit();
        flushMicrotasks();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual(PageUrls.Unauthorised);
    }));

    it('should redirect to unauthorised if user does not have profile role', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve({ role: undefined }));

        component.ngOnInit();
        flushMicrotasks();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual(PageUrls.Unauthorised);
    }));

    it('should redirect to unauthorised if user has profile role of None', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve({ role: 'None' }));

        component.ngOnInit();
        flushMicrotasks();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual(PageUrls.Unauthorised);
    }));

    it('should redirect to unauthorised when getUserProfile throws error 401', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.reject({ status: 401 }));

        component.ngOnInit();
        flushMicrotasks();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorised');
    }));

    it('should redirect to Video when getUserProfile throws error 500', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.reject({ status: 500 }));

        component.ngOnInit();
        flushMicrotasks();

        expect(redirect.to).toHaveBeenCalled();
    }));

    it('should select and start journey on init', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: 'email', role: 'role' }));

        component.ngOnInit();
        flushMicrotasks();

        expect(journeySelector.beginFor).toHaveBeenCalledWith('role');
    }));

    it('should redirect to videoAppUrl if error thrown by journeySelector', fakeAsync(() => {
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: 'email', role: 'role' }));
        journeySelector.beginFor.and.throwError('Some Error');

        component.ngOnInit();
        flushMicrotasks();

        expect(redirect.to).toHaveBeenCalled();
    }));
});
