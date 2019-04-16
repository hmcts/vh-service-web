import { TestBed, ComponentFixture, fakeAsync, async  } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { FooterStubComponent, RouterOutletStubComponent } from 'src/tests/component-stubs';
import { AdalService } from 'adal-angular4';
import { Config } from './models/config';
import { Component, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { WindowRef, WindowLocation } from './shared/window-ref';
import { PageTrackerService } from './services/page-tracker.service';
import { HeaderComponent } from './shared/header/header.component';

const adalService = {
  init: jasmine.createSpy('init'),
  handleWindowCallback: jasmine.createSpy('handleWindowCallback'),
  userInfo: jasmine.createSpy('userInfo')
};

const config = {};

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let router: any;
let window: jasmine.SpyObj<WindowRef>;
let pageTracker: jasmine.SpyObj<PageTrackerService>;
const checklistSessionServiceSpy = {
  setItem: jasmine.createSpy('isChecklistInStorage'),
};
describe('AppComponent', () => {

  beforeEach(async(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),
      events: of(new NavigationEnd(1, '/someurl', '/urlafter'))
    };

    pageTracker = jasmine.createSpyObj('PageTrackerService', ['trackNavigation', 'trackPreviousPage']);

    window = jasmine.createSpyObj('WindowRef', ['getLocation']);
    window.getLocation.and.returnValue(new WindowLocation('/url'));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterStubComponent,
        RouterOutletStubComponent,
        HeaderComponent,
      ],
      providers:
        [
          { provide: Router, useValue: router },
          { provide: AdalService, useValue: adalService },
          { provide: Config, useValue: config },
          { provide: WindowRef, useValue: window },
          { provide: PageTrackerService, useValue: pageTracker }
        ],
    }).compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should show popup confirmation', fakeAsync(() => {
    fixture.detectChanges();
    component.showConfirmation();
    expect(component.showSignOutConfirmation).toBeTruthy();
  }));

  it('should close popup confirmation', fakeAsync(() => {
    fixture.detectChanges();
    component.handleContinue();
    expect(component.showSignOutConfirmation).toBeFalsy();
  }));

  it('should close popup confirmation and navigate to logout', fakeAsync(() => {
    fixture.detectChanges();
    component.handleCancel();
    expect(component.showSignOutConfirmation).toBeFalsy();
    expect(router.navigate).toHaveBeenCalled();
  }));

  it('should redirect to login with current url as return url if not authenticated', fakeAsync(() => {
    adalService.userInfo.and.returnValue({ authenticated: false });
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
});
