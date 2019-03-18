import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CheckYourAnswersComponent } from 'src/app/check-your-answers/check-your-answers.component';
import { BackNavigationComponent } from 'src/app/back-navigation/back-navigation.component';
import { ChecklistFooterStubComponent } from 'src/tests/component-stubs';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { HearingService } from 'src/app/services/hearing.service';
import { MockHearingService } from 'src/tests/mock-hearing.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import {BeforeunloadStubComponent } from 'src/tests/component-stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorage } from '../services/session-storage';
import { MockSessionStorage } from 'src/tests/mock-session-storage';


describe('CheckYourAnswersComponent', () => {
  let component: CheckYourAnswersComponent;
  let fixture: ComponentFixture<CheckYourAnswersComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckYourAnswersComponent,
        ChecklistFooterStubComponent,
        BackNavigationComponent,
        BeforeunloadStubComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService },
        { provide: HearingService, useClass: MockHearingService },
        { provide: ChecklistService, useClass: MockChecklistService },
        { provide: ChecklistSessionService, useClass: MockChecklistSessionService },
        { provide: SessionStorage, useClass: MockSessionStorage },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckYourAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.UseSameComputer).toBeTruthy();
    expect(component.checklist.AboutClient).toBeTruthy();
    expect(component.checklist.AbilityToTakePart).toBeTruthy();
    expect(component.checklist.ClientNeedInterpreter).toBeTruthy();
    expect(component.checklist.IsHearingSuitableForVideo).toBeTruthy();
    expect(component.checklist.SuitableRoom).toBeTruthy();
    expect(component.checklist.OtherInformation).toBeTruthy();
  }));
});
