import { async } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AdalService } from 'adal-angular4';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ReturnUrlService } from 'src/app/security/return-url.service';
import { LoggerService } from 'src/app/services/logger.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: jasmine.SpyObj<Router>;
  let adalService: jasmine.SpyObj<AdalService>;
  let returnUrl: jasmine.SpyObj<ReturnUrlService>;
  let logger: jasmine.SpyObj<LoggerService>;
  let route: any;

  beforeEach(async(() => {
    route = {
      snapshot: {
        queryParams: {}
      }
    };

    logger = jasmine.createSpyObj<LoggerService>(['error']);
    adalService = jasmine.createSpyObj<AdalService>(['setAuthenticated', 'login', 'userInfo']);
    router = jasmine.createSpyObj<Router>(['navigate', 'navigateByUrl']);
    returnUrl = jasmine.createSpyObj<ReturnUrlService>(['popUrl', 'setUrl']);

    component = new LoginComponent(route, router, logger, returnUrl, adalService);
  }));

  const givenAuthenticated = (authenticated: boolean) => {
    adalService.userInfo.authenticated = authenticated;
  };

  it('should store root url if no return url is set and call login if not authenticated', () => {
    givenAuthenticated(false);
    component.ngOnInit();
    expect(adalService.login).toHaveBeenCalled();
    expect(returnUrl.setUrl).toHaveBeenCalledWith('/');
  });

  it('should remember return url if given when not authenticated', async () => {
    givenAuthenticated(false);
    route.snapshot.queryParams['returnUrl'] = 'returnto';
    await component.ngOnInit();
    expect(returnUrl.setUrl).toHaveBeenCalledWith('returnto');
  });

  it('should redirect to remembered return url if authenticated', async () => {
    givenAuthenticated(true);
    returnUrl.popUrl.and.returnValue('testurl');

    await component.ngOnInit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('testurl');
  });

  it('should redirect to root url when authenticated if no return  url has been set', async () => {
    givenAuthenticated(true);
    await component.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should redirect to root if the remembered return url is invalid', async () => {
    givenAuthenticated(true);
    router.navigateByUrl.and.throwError('invalid url');
    await component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
