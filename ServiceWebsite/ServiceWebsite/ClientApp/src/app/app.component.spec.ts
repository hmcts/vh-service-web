import { TestBed, ComponentFixture, fakeAsync, async  } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { Config } from './modules/shared/models/config';
import { of } from 'rxjs';
import { WindowRef, WindowLocation } from './modules/shared/window-ref';
import { PageTrackerService } from './services/page-tracker.service';
import { HeaderComponent } from './modules/shared/header/header.component';
import { Component } from '@angular/core';
import { JourneySelector } from './modules/base-journey/services/journey.selector';
import { ProfileService } from './services/profile.service';

const adalService = {
  init: jasmine.createSpy('init'),
  handleWindowCallback: jasmine.createSpy('handleWindowCallback'),
  userInfo: jasmine.createSpy('userInfo')
};

@Component({ selector: 'app-footer', template: '' })
export class FooterStubComponent { }

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

const config = {};

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let router: any;
let window: jasmine.SpyObj<WindowRef>;
let pageTracker: jasmine.SpyObj<PageTrackerService>;
let journeySelector: jasmine.SpyObj<JourneySelector>;
let profileService: jasmine.SpyObj<ProfileService>;

describe('AppComponent', () => {

  beforeEach(async(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),
      events: of(new NavigationEnd(1, '/someurl', '/urlafter'))
    };

    journeySelector = jasmine.createSpyObj<JourneySelector>(['getJourney']);
    profileService = jasmine.createSpyObj<ProfileService>(['getUserProfile']);

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
          { provide: PageTrackerService, useValue: pageTracker },
          { provide: ProfileService, useValue: profileService },
          { provide: JourneySelector, useValue: journeySelector }
        ],
    }).compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
