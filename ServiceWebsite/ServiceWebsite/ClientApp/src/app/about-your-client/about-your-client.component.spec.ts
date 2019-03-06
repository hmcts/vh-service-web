import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';

import { AboutYourClientComponent } from './about-your-client.component';
import { ProfileService } from '../services/profile.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';

import { ChecklistModel } from '../models/checklist.model';
import { UserProfile } from '../models/user-profile.model';
import { Hearing } from '../models/hearing.model';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../services/session-storage';
import { BackNavigationStubComponent, ChecklistFooterStubComponent, ChecklistStepsStubComponent, BeforeunloadStubComponent } from '../../tests/component-stubs';

describe('AboutYourClientComponent', () => {

  let routerSpy = {
    navigate: jasmine.createSpy('navigate'),
  }

  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let profile = new UserProfile();
  profile.email = "aa@aa.aa";
  profileServiceSpy = jasmine.createSpyObj<ProfileService>('ProfileService', ['getUserProfile']);
  profileServiceSpy.getUserProfile.and.returnValue(Promise.resolve(profile));

  let checklistSessionServiceSpy: jasmine.SpyObj<ChecklistSessionService>;
  let checklistModel = new ChecklistModel(1, "aa@aa.aa");
  checklistSessionServiceSpy = jasmine.createSpyObj<ChecklistSessionService>('ChecklistSessionService', ['getChecklist', 'saveChecklist']);
  checklistSessionServiceSpy.getChecklist.and.returnValue(checklistModel);

  let hearingServiceSpy: jasmine.SpyObj<HearingService>;
  let hearing = new Hearing();
  hearing.id = 1;
  hearingServiceSpy = jasmine.createSpyObj<HearingService>('HearingService', ['getNextHearingDetails']);
  hearingServiceSpy.getNextHearingDetails.and.returnValue(Promise.resolve(hearing));

  let debugElement: DebugElement;
  let fixture: ComponentFixture<AboutYourClientComponent>;
  let component;
  let localeResources;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutYourClientComponent,
        BackNavigationStubComponent,
        ChecklistStepsStubComponent,
        ChecklistFooterStubComponent,
        BeforeunloadStubComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      providers:
        [
          { provide: Router, useValue: routerSpy },
          { provide: ProfileService, useValue: profileServiceSpy },
          { provide: ChecklistSessionService, useValue: checklistSessionServiceSpy },
          { provide: HearingService, useValue: hearingServiceSpy },
          { provide: SessionStorage, useClass: MockSessionStorage },
        ],
    }).compileComponents();

    localeResources = LocaleResources[CONFIG.Locale];
    fixture = TestBed.createComponent(AboutYourClientComponent);
    debugElement = fixture.debugElement;
    component = debugElement.componentInstance;
  }));

  it('should create the AboutYourClientComponent', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.AboutClient).toBeTruthy();
  }));
  it('should show error message if the form is submitted and invalid', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    component.submitDetails();
    fixture.detectChanges();
    tick()
    expect(component.submitted).toBeTruthy();
    expect(component.form.invalid).toBeTruthy();
    const element = debugElement.query(By.css('#about-your-client-error'));
    expect(element.nativeElement.innerHTML).toContain(localeResources.PleaseAnswerThisQuestion);
  }));
  it('should save submitted answer yes', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    component.checklist = new ChecklistModel(1, "aa@aa.aa");
    component.model.aboutClient = "yes";
    component.submitDetails();
    fixture.detectChanges();
    tick()
    expect(component.submitted).toBeTruthy();
    expect(component.form.invalid).toBeFalsy();
    expect(component.checklist.AboutClient).toBeTruthy();
  }));

  it('should save submitted answer no', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    component.checklist = new ChecklistModel(1, "aa@aa.aa");
    component.model.aboutClient = "no";
    component.submitDetails();
    fixture.detectChanges();
    tick()
    expect(component.submitted).toBeTruthy();
    expect(component.form.invalid).toBeFalsy();
    expect(component.checklist.AboutClient).toBeTruthy();
    expect(component.checklist.AboutClient.Value).toBeFalsy();
  }));
});
