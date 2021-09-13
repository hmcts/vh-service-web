import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import {
    AuthorizationResult,
    AuthorizedState,
    EventTypes,
    OidcClientNotification,
    OidcSecurityService,
    PublicEventsService,
    ValidationResult
} from 'angular-auth-oidc-client';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DeviceType } from './modules/base-journey/services/device-type';
import { HeaderComponent } from './modules/shared/header/header.component';
import { Config } from './modules/shared/models/config';
import { WindowLocation, WindowRef } from './modules/shared/window-ref';
import { Paths } from './paths';
import { ConfigService } from './services/config.service';
import { Logger } from './services/logger';
import { PageTrackerService } from './services/page-tracker.service';
import { MockLogger } from './testing/mocks/mock-logger';
import { MockOidcSecurityService } from './testing/mocks/MockOidcSecurityService';

@Component({ selector: 'app-footer', template: '' })
export class FooterStubComponent {}

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {}

@Component({ selector: 'app-beta-banner', template: '' })
export class BetaBannerStubComponent {}

describe('AppComponent', () => {
    const config = {};
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: any;
    let window: jasmine.SpyObj<WindowRef>;
    let pageTracker: jasmine.SpyObj<PageTrackerService>;
    let configServiceSpy: jasmine.SpyObj<ConfigService>;
    const mockOidcSecurityService = new MockOidcSecurityService();
    let oidcSecurityService;
    let deviceTypeServiceSpy: jasmine.SpyObj<DeviceType>;
    let publicEventsServiceSpy: jasmine.SpyObj<PublicEventsService>;
    const eventValue: OidcClientNotification<AuthorizationResult> = {
        type: EventTypes.NewAuthorizationResult,
        value: { isRenewProcess: false, authorizationState: AuthorizedState.Authorized, validationResult: ValidationResult.Ok }
    };

    const clientSettings = new Config();
    clientSettings.tenant_id = 'tenantid';
    clientSettings.client_id = 'clientid';
    clientSettings.post_logout_redirect_uri = '/';
    clientSettings.redirect_uri = '/';

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

            pageTracker = jasmine.createSpyObj('PageTrackerService', ['trackNavigation', 'trackPreviousPage']);
            deviceTypeServiceSpy = jasmine.createSpyObj<DeviceType>(['isSupportedBrowser']);
            window = jasmine.createSpyObj('WindowRef', ['getLocation']);
            window.getLocation.and.returnValue(new WindowLocation('/url'));

            publicEventsServiceSpy = jasmine.createSpyObj('PublicEventsService', ['registerForEvents']);
            publicEventsServiceSpy.registerForEvents.and.returnValue(of(eventValue));

            TestBed.configureTestingModule({
                declarations: [AppComponent, FooterStubComponent, RouterOutletStubComponent, HeaderComponent, BetaBannerStubComponent],
                providers: [
                    { provide: OidcSecurityService, useValue: mockOidcSecurityService },
                    { provide: ConfigService, useValue: configServiceSpy },
                    { provide: Router, useValue: router },
                    { provide: Config, useValue: config },
                    { provide: WindowRef, useValue: window },
                    { provide: PageTrackerService, useValue: pageTracker },
                    { provide: DeviceType, useValue: deviceTypeServiceSpy },
                    { provide: Logger, useValue: new MockLogger() },
                    { provide: PublicEventsService, useValue: publicEventsServiceSpy }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should navigate to unsupported browser page if browser is not compatible', () => {
        deviceTypeServiceSpy.isSupportedBrowser.and.returnValue(false);
        component.checkBrowser();
        expect(router.navigateByUrl).toHaveBeenCalledWith(Paths.UnsupportedBrowser);
    });

    it('unsubcribe from event service on destroy', () => {
        component.ngOnInit();
        spyOn(component.eventServiceSubscription$, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.eventServiceSubscription$.unsubscribe).toHaveBeenCalled();
    });
});
