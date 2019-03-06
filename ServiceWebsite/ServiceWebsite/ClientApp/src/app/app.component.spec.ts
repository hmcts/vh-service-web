import { TestBed, ComponentFixture, fakeAsync, tick, async  } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { FooterStubComponent, RouterOutletStubComponent } from 'src/tests/component-stubs';
import { AdalService } from 'adal-angular4';
import { Config } from './models/config';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowRef, WindowLocation } from './shared/window-ref';
import { PageTrackerService } from './services/page-tracker.service';
import { HeaderComponent } from './shared/header/header.component';
import { ChecklistSessionService } from './services/checklist-session.service';


const adalService = {
  init: jasmine.createSpy('init'),
  handleWindowCallback: jasmine.createSpy('handleWindowCallback'),
  userInfo: jasmine.createSpy('userInfo')
};

const config = {};

@Component({
  selector: 'app-confirmation-signout-popup',
  template: ''
})
export class ConfirmationSignoutPopupStubComponent {
  @Output() continueAnswers: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAnswers: EventEmitter<any> = new EventEmitter<any>();
};

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let router: any;
let window: jasmine.SpyObj<WindowRef>;
let pageTracker: jasmine.SpyObj<PageTrackerService>;
const checklistSessionServiceSpy = {
  setItem: jasmine.createSpy('isChecklistInStorage'),
}
describe('AppComponent', () => {

  beforeEach(async(() => {
    router = {
      navigate: jasmine.createSpy('navigate'),
      events: Observable.of(new NavigationEnd(1, '/someurl', '/urlafter'))
    };

    pageTracker = jasmine.createSpyObj('PageTrackerService', ['trackNavigation', 'trackPreviousPage']);

    window = jasmine.createSpyObj('WindowRef', ['getLocation']);
    window.getLocation.and.returnValue(new WindowLocation('/url'));

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterStubComponent,
        RouterOutletStubComponent,
        ConfirmationSignoutPopupStubComponent,
        HeaderComponent,
      ],
      providers:
        [
          { provide: Router, useValue: router },
          { provide: AdalService, useValue: adalService },
          { provide: Config, useValue: config },
          { provide: WindowRef, useValue: window },
          { provide: PageTrackerService, useValue: pageTracker },
          { provide: ChecklistSessionService, useValue: checklistSessionServiceSpy },

        ],
    }).compileComponents()

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

    let lastRouterCall = router.navigate.calls.mostRecent();
    let lastRoutingArgs = {
      url: lastRouterCall.args[0][0],
      queryParams: lastRouterCall.args[1].queryParams
    };
    expect(lastRoutingArgs.url).toEqual('/login');
    expect(lastRoutingArgs.queryParams.returnUrl).toEqual('/url?search#hash');
  }));
});
