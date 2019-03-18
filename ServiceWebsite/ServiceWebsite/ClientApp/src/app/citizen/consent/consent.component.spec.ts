import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ConsentComponent } from './consent.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { HearingService } from 'src/app/services/hearing.service';
import { MockHearingService } from 'src/tests/mock-hearing.service';
import {
  BackNavigationStubComponent,
  ChecklistFooterStubComponent,
  ChecklistStepsStubComponent,
  BeforeunloadStubComponent
} from '../../../tests/component-stubs';
import { By } from '@angular/platform-browser';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../../services/session-storage';


describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConsentComponent,
        BackNavigationStubComponent,
        ChecklistFooterStubComponent,
        ChecklistStepsStubComponent,
        BeforeunloadStubComponent
      ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService },
        { provide: ChecklistService, useClass: MockChecklistService },
        { provide: ChecklistSessionService, useClass: MockChecklistSessionService },
        { provide: HearingService, useClass: MockHearingService },
        { provide: SessionStorage, useClass: MockSessionStorage },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentComponent);
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
    expect(component.checklist.Consent).toBeTruthy();
  }));

  it('should set consent as Yes on clicking yes radio button', () => {
    const consentRadioYes = fixture.debugElement.query(By.css('#consent_yes')).nativeElement;
    consentRadioYes.click();
    consentRadioYes.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.consentForm.get('consent');
    expect(tempControl.value).toBe('Yes');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeFalsy();
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    expect(component.consentForm.valid).toBeTruthy();
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('input').value).toBe('Yes');
  });

  it('should set consent as No on clicking no radio button', () => {
    const consentRadioNo = fixture.debugElement.query(By.css('#consent_no')).nativeElement;
    consentRadioNo.click();
    consentRadioNo.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.consentForm.get('consent');
    expect(tempControl.value).toBe('No');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeTruthy();
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    component.consentForm.get('moreDetails').setValue('Test details');
    expect(component.consentForm.valid).toBeTruthy();
    component.consentForm.get('moreDetails').setValue('');
  });
});
