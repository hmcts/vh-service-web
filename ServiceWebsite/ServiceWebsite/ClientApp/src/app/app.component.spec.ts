import { Router, NavigationEnd } from '@angular/router';
import { of, throwError as _observableThrow } from 'rxjs';
import { TestBed, ComponentFixture, fakeAsync, waitForAsync } from '@angular/core/testing';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProfileService } from './services/profile.service';
import { ConfigService } from './services/config.service';
import { MockOidcSecurityService } from './testing/mocks/MockOidcSecurityService';
import { PageTrackerService } from './services/page-tracker.service';
import { DocumentRedirectService } from './services/document-redirect.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/shared/header/header.component';
import { Component } from '@angular/core';
import { JourneySelector } from './modules/base-journey/services/journey.selector';
import { DeviceType } from './modules/base-journey/services/device-type';
import { Paths } from './paths';
import { NavigationBackSelector } from './modules/base-journey/services/navigation-back.selector';
import { Logger } from './services/logger';
import { MockLogger } from './testing/mocks/mock-logger';
import { Config } from './modules/shared/models/config';
import { WindowRef, WindowLocation } from './modules/shared/window-ref';

@Component({ selector: 'app-footer', template: '' })
export class FooterStubComponent {
}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {
}

@Component({ selector: 'app-beta-banner', template: '' })
export class BetaBannerStubComponent {
}

describe('AppComponent', () => {

    const config = {};
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: any;
    let window: jasmine.SpyObj<WindowRef>;
    let pageTracker: jasmine.SpyObj<PageTrackerService>;
    let journeySelector: jasmine.SpyObj<JourneySelector>;
    let navigationBackSelector: jasmine.SpyObj<NavigationBackSelector>;
    let redirect: jasmine.SpyObj<DocumentRedirectService>;
    let profileService: jasmine.SpyObj<ProfileService>;
    let configServiceSpy: jasmine.SpyObj<ConfigService>;
    const mockOidcSecurityService = new MockOidcSecurityService();
    let oidcSecurityService;
    let deviceTypeServiceSpy: jasmine.SpyObj<DeviceType>;

    const clientSettings = new Config();
    clientSettings.tenant_id = 'tenantid',
    clientSettings.client_id = 'clientid',
    clientSettings.post_logout_redirect_uri = '/',
    clientSettings.redirect_uri = '/'

    beforeEach(
        waitForAsync(() => {
            router = {
                navigate: jasmine.createSpy('navigate'),
                navigateByUrl: jasmine.createSpy('navigateByUrl'),
                events: of(new NavigationEnd(1, '/someurl', '/urlafter'))
            };

            configServiceSpy = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings', 'loadConfig']);
            configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
            oidcSecurityService = mockOidcSecurityService;

            journeySelector = jasmine.createSpyObj<JourneySelector>(['beginFor']);
            navigationBackSelector = jasmine.createSpyObj<NavigationBackSelector>(['beginFor']);
            redirect = jasmine.createSpyObj<DocumentRedirectService>(['to']);
            profileService = jasmine.createSpyObj<ProfileService>(['getUserProfile']);
            pageTracker = jasmine.createSpyObj('PageTrackerService', ['trackNavigation', 'trackPreviousPage']);
            deviceTypeServiceSpy = jasmine.createSpyObj<DeviceType>(['isSupportedBrowser']);
            window = jasmine.createSpyObj('WindowRef', ['getLocation']);
            window.getLocation.and.returnValue(new WindowLocation('/url'));

            TestBed.configureTestingModule({
                declarations: [
                    AppComponent,
                    FooterStubComponent,
                    RouterOutletStubComponent,
                    HeaderComponent,
                    BetaBannerStubComponent
                ],
                providers:
                    [
                        { provide: OidcSecurityService, useValue: mockOidcSecurityService },
                        { provide: ConfigService, useValue: configServiceSpy },
                        { provide: Router, useValue: router },
                        { provide: Config, useValue: config },
                        { provide: WindowRef, useValue: window },
                        { provide: PageTrackerService, useValue: pageTracker },
                        { provide: ProfileService, useValue: profileService },
                        { provide: JourneySelector, useValue: journeySelector },
                        { provide: DeviceType, useValue: deviceTypeServiceSpy },
                        { provide: NavigationBackSelector, useValue: navigationBackSelector },
                        { provide: DocumentRedirectService, useValue: redirect },
                        { provide: Logger, useValue: new MockLogger() }
                    ]
            }).compileComponents();
        })
    );
    
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should redirect to login with current url as return url if not authenticated', fakeAsync(() => {
        mockOidcSecurityService.setAuthenticated(false);
        window.getLocation.and.returnValue(new WindowLocation('/url', '?search', '#hash'));

        component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = {
            url: lastRouterCall.args[0][0],
            queryParams: lastRouterCall.args[1].queryParams
        };
        expect(lastRoutingArgs.url).toEqual('/login');
        expect(lastRoutingArgs.queryParams.returnUrl).toEqual('/url?search#hash');
    }));

    it('should redirect to unauthorized if user does not have profile', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve(undefined));
        await component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorized');
    });

    it('should redirect to unauthorized if user does not have profile email', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: undefined }));
        await component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorized');
    });

    it('should redirect to unauthorized if user does not have profile role', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve({ role: undefined }));
        await component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorized');
    });

    it('should redirect to unauthorized if user has profile role of None', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve({ role: 'None' }));
        await component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorized');
    });

    it('should redirect to unauthorized when getUserProfile throws error 401', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(
            Promise.reject({ status: 401 })
        );

        await component.ngOnInit();

        const lastRouterCall = router.navigate.calls.mostRecent();
        const lastRoutingArgs = { url: lastRouterCall.args[0][0] };

        expect(lastRoutingArgs.url).toEqual('/unauthorized');
    });

    it('should redirect to Video when getUserProfile throws error 500', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(
            Promise.reject({ status: 500 })
        );

        await component.ngOnInit();

        expect(redirect.to).toHaveBeenCalled();
    });

    it('should select and start journey on init', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: 'email', role: 'role' }));
        await component.ngOnInit();

        expect(journeySelector.beginFor).toHaveBeenCalledWith('role');
    });

    it('should navigate to unsupported browser page if browser is not compatible', () => {
        deviceTypeServiceSpy.isSupportedBrowser.and.returnValue(false);
        component.checkBrowser();
        expect(router.navigateByUrl).toHaveBeenCalledWith(Paths.UnsupportedBrowser);
    });

    it('should redirect to videoAppUrl if error thrown by journeySelector', async () => {
        mockOidcSecurityService.setAuthenticated(true);
        profileService.getUserProfile.and.returnValue(Promise.resolve({ email: 'email', role: 'role' }));
        journeySelector.beginFor.and.throwError('Some Error');
        await component.ngOnInit();

        expect(redirect.to).toHaveBeenCalled();
    });
});
