import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UseSameComputerComponent } from './use-same-computer.component';
import { ChecklistFooterStubComponent } from 'src/tests/component-stubs';
import { BackNavigationComponent } from 'src/app/back-navigation/back-navigation.component';
import { ChecklistStepsComponent } from 'src/app/checklist-steps/checklist-steps.component';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HearingService } from 'src/app/services/hearing.service';
import { MockHearingService } from 'src/tests/mock-hearing.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChecklistModel } from '../models/checklist.model';

describe('UseSameComputerComponent', () => {
  let component: UseSameComputerComponent;
  let fixture: ComponentFixture<UseSameComputerComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UseSameComputerComponent,
        ChecklistFooterStubComponent,
        ChecklistStepsComponent,
        BackNavigationComponent
      ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService },
        { provide: HearingService, useClass: MockHearingService },
        { provide: ChecklistService, useClass: MockChecklistService },
        { provide: ChecklistSessionService, useClass: MockChecklistSessionService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseSameComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if the form is submitted and invalid', fakeAsync(() => {
    component.continue();
    fixture.detectChanges();
    tick();
    expect(component.submitted).toBeTruthy();
    expect(component.sameComputerForm.invalid).toBeTruthy();
    const element = fixture.debugElement.query(By.css('#sameComputer-error'));
    expect(element.nativeElement.innerHTML).toContain('Please answer this question');
  }));

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.UseSameComputer).toBeTruthy();
  }));

  it('should set answer as no when no radio button clicked', () => {
    const sameCompNo = fixture.debugElement.query(By.css('#same-computer-2')).nativeElement;
    sameCompNo.click();
    sameCompNo.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.sameComputerForm.get('sameComputer');
    expect(tempControl.value).toBe('No');
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    expect(component.sameComputerForm.valid).toBeTruthy();
  });

  it('should set answer as yes when yes radio button clicked', () => {
    const sameCompYes = fixture.debugElement.query(By.css('#same-computer-1')).nativeElement;
    sameCompYes.click();
    sameCompYes.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.sameComputerForm.get('sameComputer');
    expect(tempControl.value).toBe('Yes');
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    expect(component.sameComputerForm.valid).toBeTruthy();
  });
});
