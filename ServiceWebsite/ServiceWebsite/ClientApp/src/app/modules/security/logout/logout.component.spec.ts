import { waitForAsync } from '@angular/core/testing';
import { MockOidcSecurityService } from 'src/app/testing/mocks/MockOidcSecurityService';
import { Config } from '../../shared/models/config';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {

  const mockOidcSecurityService = new MockOidcSecurityService();
  let oidcSecurityService;
  const clientSettings = new Config();
  clientSettings.tenant_id = 'tenantid';
  clientSettings.client_id = 'clientid';
  clientSettings.post_logout_redirect_uri = '/';
  clientSettings.redirect_uri = '/';
  let component: LogoutComponent;
  beforeEach(
    waitForAsync(() => {
      oidcSecurityService = mockOidcSecurityService;
      component = new LogoutComponent(oidcSecurityService);

      // ensure there are no old or interferring value in session storage
      sessionStorage.clear();
    })
  );

  it('should logout from oidc on loading component if logged in', async () => {
    spyOn(oidcSecurityService, 'logoffAndRevokeTokens');
    mockOidcSecurityService.setAuthenticated(true);

    await component.ngOnInit();
    expect(oidcSecurityService.logoffAndRevokeTokens).toHaveBeenCalled();
  });

  it('should clear session storage', async () => {
    sessionStorage.setItem('temp', JSON.stringify({test: true}));

    expect(sessionStorage.length).toBe(1);
    await component.ngOnInit();
    expect(sessionStorage.length).toBe(0);
  });
});
