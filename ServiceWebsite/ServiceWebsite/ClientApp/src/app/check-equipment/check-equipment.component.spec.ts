import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Router} from '@angular/router';
import { DebugElement } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';


import { CheckEquipmentComponent } from './check-equipment.component';
import { SessionStorage } from '../services/session-storage';
import { PageTrackerService } from '../services/page-tracker.service';

import { SpeedTestService } from '../services/speedtest.service';
import { NavigatorService } from './navigator.service';
import { ProfileService } from '../services/profile.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { PageUrls } from '../shared/page-url.constants';

import { ChecklistModel} from '../models/checklist.model';
import { CheckEquipmentModel } from '../models/check-equipment.model';
import { UserProfile } from '../models/user-profile.model';
import { SpeedTestModel } from '../models/speedtest.model';
import { Hearing } from '../models/hearing.model';
import { BeforeunloadStubComponent } from '../../tests/component-stubs';


describe('CheckEquipmentComponent', () => {

  @Component({ selector: 'app-back-navigation', template: '' })
  class BackNavigationStubComponent {
    @Input()
    userProfile: UserProfile;
  }

  @Component({ selector: 'app-checklist-steps', template: '' })
  class WizardStepsStubComponent {
  }

  @Component({ selector: 'app-progressbar-basic', template: '' })
  class ProgressbarBasicStubComponent {
    @Input() checkError: string;
    @Input() checkTitle: string;
    @Input() checkValue: number;
    @Input() checkResult: string;
  }

  @Component({ selector: 'app-checklist-footer', template: '' })
  class FooterStubComponent {
  }

  const routerSpy = {
    navigate: jasmine.createSpy('navigate'),
  };

  const userProfile = new UserProfile();

  const storageSpy = {
    getObject: jasmine.createSpy('getObject').and.returnValues(userProfile, userProfile, userProfile, null),
    setObject: jasmine.createSpy('setObject'),
    getItem: jasmine.createSpy('getItem').and.returnValues(PageUrls.CompatibilityCheck, PageUrls.AboutYourEquipment),
  };

  const pageTrackerServiceSpy = {
    getPreviousUrl: jasmine.createSpy('getPreviousUrl').and.returnValues(PageUrls.CompatibilityCheck, PageUrls.AboutYourEquipment),



  };

  const info = new SpeedTestModel();
  info.DownloadSpeed = 58.89;
  info.UploadSpeed = 17.876;

  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  const profile = new UserProfile();
  profile.email = 'aa@aa.aa';
  profileServiceSpy = jasmine.createSpyObj<ProfileService>('ProfileService', ['getUserProfile']);
  profileServiceSpy.getUserProfile.and.returnValue(Promise.resolve(profile));

  class SpeedTestServiceStub {
    speedTestState$ = new Observable<SpeedTestModel>(s => {
      s.next(info);
    });
    click() { }
  }

  class NavigatorServiceStub {
    mediaDevices$ = new Observable<any>();
    navigatorDeviceInfo() { return 'Desktop'; }
    agentInfo() { return 'Safari'; }
    mediaDeviceInfo() { }
   }



  class ChecklistSessionServiceSpy {
    getChecklist(hearingId: number, userId: string): ChecklistModel {
      return new ChecklistModel(hearingId, userId);
    }
    saveChecklist(checklist: ChecklistModel) { }
  }

  let hearingServiceSpy: jasmine.SpyObj<HearingService>;
  const hearing = new Hearing();
  hearing.id = 1;
  hearingServiceSpy = jasmine.createSpyObj<HearingService>('HearingService', ['getNextHearingDetails']);
  hearingServiceSpy.getNextHearingDetails.and.returnValue(Promise.resolve(hearing));

  let debugElement: DebugElement;
  let fixture: ComponentFixture<CheckEquipmentComponent>;
  let checkEquipment;
  let originalTimeout;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckEquipmentComponent,
        BackNavigationStubComponent,
        ProgressbarBasicStubComponent,
        WizardStepsStubComponent,
        FooterStubComponent,
        BeforeunloadStubComponent
      ],
      providers:
        [
          { provide: SessionStorage, useValue: storageSpy },
          { provide: Router, useValue: routerSpy },
          { provide: SpeedTestService, useClass: SpeedTestServiceStub },
          { provide: NavigatorService, useClass: NavigatorServiceStub },
          { provide: ProfileService, useValue: profileServiceSpy },
          { provide: ChecklistSessionService, useClass: ChecklistSessionServiceSpy },
          { provide: HearingService, useValue: hearingServiceSpy },
          { provide: PageTrackerService, useValue: pageTrackerServiceSpy },
        ],
    }).compileComponents();

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000;

    fixture = TestBed.createComponent(CheckEquipmentComponent);
    debugElement = fixture.debugElement;
    checkEquipment = debugElement.componentInstance;
  }));

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create the Check Equipment component', fakeAsync(() => {
    fixture.detectChanges();
    tick(20000);
    expect(checkEquipment).toBeTruthy();
  }));

  it('should retrieve user profile from storage', fakeAsync(() => {
      checkEquipment.ngOnInit();
      tick(20000);
      fixture.detectChanges();
    fixture.whenStable().then(() => {
      /* tslint:disable:no-unused-expression */
      expect(checkEquipment.userProfile).toBeTruthy;
    });
    fixture.detectChanges();
  }));

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    checkEquipment.ngOnInit();
    tick();
    expect(checkEquipment.checklist).toBeTruthy();
    expect(checkEquipment.checklist.CheckEquipment).toBeTruthy();
    expect(checkEquipment.checklist.CheckEquipment.length).toEqual(0);
  }));

  it('should run test and hide continue button', async(() => {
    fixture.detectChanges();
    checkEquipment.ngOnInit();

    expect(checkEquipment.isRunTest).toBeTruthy();
    expect(checkEquipment.showContinueButton).toBeFalsy();
  }));

  it('should create list of CheckEquipmentModel with 4 items in', fakeAsync(() => {
    fixture.detectChanges();
    checkEquipment.ngOnInit();
    tick();
    const checks = <Array<CheckEquipmentModel>>checkEquipment.checks;
    expect(checks).toBeTruthy();
    expect(checks.length).toEqual(4);
    expect(checks[0].checkValue).toEqual(0);
  }));

  it('should not run test as it was navigated back', fakeAsync(() => {
    fixture.detectChanges();
    checkEquipment.ngOnInit();
    tick();
    expect(checkEquipment.isRunTest).toBeFalsy();
  }));

  it('should populate checklist with test result ', fakeAsync(() => {
    fixture.detectChanges();
    checkEquipment.ngOnInit();
    tick();
    checkEquipment.continue();
    expect(checkEquipment.checklist).toBeTruthy();
    expect(checkEquipment.checklist.CheckEquipment).toBeTruthy();
    expect(checkEquipment.checklist.CheckEquipment.length).toEqual(4);
    expect(checkEquipment.checklist.CheckEquipment[0].KeyName).toEqual(checkEquipment.checks[0].checkKey);
    expect(checkEquipment.checklist.CheckEquipment[1].KeyName).toEqual(checkEquipment.checks[1].checkKey);
    expect(checkEquipment.checklist.CheckEquipment[2].KeyName).toEqual(checkEquipment.checks[2].checkKey);
    expect(checkEquipment.checklist.CheckEquipment[3].KeyName).toEqual(checkEquipment.checks[3].checkKey);
  }));
});
