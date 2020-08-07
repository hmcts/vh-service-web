import {LogoutComponent} from './logout.component';
import {AdalService} from 'adal-angular4';

describe('LogoutComponent', () => {
  const adalSpy = jasmine.createSpyObj<AdalService>(['logOut', 'userInfo']);
  const component = new LogoutComponent(adalSpy);

  beforeEach(() => {
    // ensure there are no old or interferring value in session storage
    sessionStorage.clear();
  });

  it('should logout adal on loading component if logged in', () => {
    adalSpy.userInfo.authenticated = true;
    component.ngOnInit();
    expect(adalSpy.logOut).toHaveBeenCalled();
  });

  it('should clear session storage', () => {
    sessionStorage.setItem('temp', JSON.stringify({test: true}));

    expect(sessionStorage.length).toBe(1);
    component.ngOnInit();
    expect(sessionStorage.length).toBe(0);
  });
});
