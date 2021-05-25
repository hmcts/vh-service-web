import { Router } from '@angular/router';
import { MockOidcSecurityService } from 'src/app/testing/mocks/MockOidcSecurityService';
import { PageUrls } from '../../shared/constants/page-url.constants';
import { AuthGuard } from './auth.guard';

describe('authguard', () => {
    let authGuard: AuthGuard;
    let oidcSecurityService;
    const mockOidcSecurityService = new MockOidcSecurityService();
    let router: jasmine.SpyObj<Router>;

    beforeAll(() => {
        oidcSecurityService = mockOidcSecurityService;
        router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    });

    beforeEach(() => {
        authGuard = new AuthGuard(oidcSecurityService, router);
    });

    describe('when logged in with successful authentication', () => {
        it('canActivate should return true', async () => {
            oidcSecurityService.setAuthenticated(true);
            const result = await authGuard.canActivate(null, null).toPromise();
            expect(result).toBeTruthy();
        });
    });

    describe('when login failed with unsuccessful authentication', () => {
        it('canActivate should return false', async () => {
            oidcSecurityService.setAuthenticated(false);
            const result = await authGuard.canActivate(null, null).toPromise();
            expect(result).toBeFalsy();
            expect(router.navigate).toHaveBeenCalledWith([`${PageUrls.Login}`]);
        });
    });
});
