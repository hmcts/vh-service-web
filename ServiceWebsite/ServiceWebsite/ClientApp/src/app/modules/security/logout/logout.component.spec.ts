import { waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { ConfigService } from 'src/app/services/config.service';
import { MockOidcSecurityService } from 'src/app/testing/mocks/MockOidcSecurityService';
import { Config } from '../../shared/models/config';
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {

  let configServiceSpy: jasmine.SpyObj<ConfigService>;
  const mockOidcSecurityService = new MockOidcSecurityService();
  let oidcSecurityService;
  const clientSettings = new Config();
  clientSettings.tenantId = 'tenantid',
  clientSettings.clientId = 'clientid',
  clientSettings.postLogoutRedirectUri = '/',
  clientSettings.redirectUri = '/'
  let component: LogoutComponent;
  beforeEach(
    waitForAsync(() => {
      configServiceSpy = jasmine.createSpyObj<ConfigService>('ConfigService', ['getClientSettings', 'loadConfig']);
      configServiceSpy.getClientSettings.and.returnValue(of(clientSettings));
      oidcSecurityService = mockOidcSecurityService;
      component = new LogoutComponent(oidcSecurityService, configServiceSpy);
    
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
