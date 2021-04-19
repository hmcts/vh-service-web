import { MockOidcSecurityService } from 'src/app/testing/mocks/MockOidcSecurityService';
import {LogoutComponent} from './logout.component';

describe('LogoutComponent', () => {

  const mockOidcSecurityService = new MockOidcSecurityService();
  let oidcSecurityService;
  const component = new LogoutComponent(oidcSecurityService);

  beforeEach(() => {
    // ensure there are no old or interferring value in session storage
    sessionStorage.clear();
    oidcSecurityService = mockOidcSecurityService;
  });

  it('should logout from oidc on loading component if logged in', () => {
    mockOidcSecurityService.setAuthenticated(true);
    component.ngOnInit();
    expect(oidcSecurityService.logoffAndRevokeTokens).toHaveBeenCalled();
  });

  it('should clear session storage', () => {
    sessionStorage.setItem('temp', JSON.stringify({test: true}));

    expect(sessionStorage.length).toBe(1);
    component.ngOnInit();
    expect(sessionStorage.length).toBe(0);
  });
});
