import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { WindowRef } from '../../shared/window-ref';

import { ReturnUrlService } from 'src/app/modules/security/return-url.service';
import { ConfigService } from 'src/app/services/config.service';
import { MockOidcSecurityService } from 'src/app/testing/mocks/MockOidcSecurityService';
import { LoginComponent } from './login.component';
import { Logger } from 'src/app/services/logger';
import { Config } from '../../shared/models/config';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let router: jasmine.SpyObj<Router>;
    let returnUrl: jasmine.SpyObj<ReturnUrlService>;
    let logger: jasmine.SpyObj<Logger>;
    let window: jasmine.SpyObj<WindowRef>;
    let route: any;
    let configServiceSpy: jasmine.SpyObj<ConfigService>;
    const mockOidcSecurityService = new MockOidcSecurityService();
    let oidcSecurityService;
    const clientSettings = new Config();

    beforeEach(
        waitForAsync(() => {
            route = {
                snapshot: {
                    queryParams: {}
                }
            };

            logger = jasmine.createSpyObj<Logger>(['error']);
            router = jasmine.createSpyObj<Router>(['navigate', 'navigateByUrl']);
            router.navigateByUrl.and.returnValue(Promise.resolve());
            router.navigate.and.returnValue(Promise.resolve());
            returnUrl = jasmine.createSpyObj<ReturnUrlService>(['popUrl', 'setUrl']);
            window = jasmine.createSpyObj<WindowRef>(['getLocation']);
            configServiceSpy = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings', 'loadConfig']);
            configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
            oidcSecurityService = mockOidcSecurityService;

            component = new LoginComponent(router, logger, returnUrl, oidcSecurityService, configServiceSpy);
        })
    );

    const givenAuthenticated = (authenticated: boolean) => {
        oidcSecurityService.setAuthenticated(authenticated);
    };

    const whenInitializingComponent = async (): Promise<void> => {
        window.getLocation.and.returnValue({ pathname: '/login' });
        await component.ngOnInit();
    };

    it('should store root url if no return url is set and call login if not authenticated', async () => {
        givenAuthenticated(false);

        await whenInitializingComponent();

        expect(returnUrl.setUrl).toHaveBeenCalledWith('/');
    });

    it('should remember return url if given when not authenticated', async () => {
        givenAuthenticated(false);

        // and we have a return url set in the query param
        returnUrl.popUrl.and.returnValue('returnto');

        await whenInitializingComponent();

        expect(returnUrl.setUrl).toHaveBeenCalledWith('returnto');
    });

    it('should redirect to remembered return url if authenticated', async () => {
        givenAuthenticated(true);
        returnUrl.popUrl.and.returnValue('testurl');

        await whenInitializingComponent();

        expect(router.navigateByUrl).toHaveBeenCalledWith('testurl');
    });

    it('should redirect to root url when authenticated if no return  url has been set', async () => {
        givenAuthenticated(true);

        await whenInitializingComponent();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should redirect to root if authenticated observable throws an error', async () => {
        oidcSecurityService.setThrowErrorOnIsAuth(true);

        await whenInitializingComponent();

        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
});
