import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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
import { By } from '@angular/platform-browser';
import {
  BackNavigationStubComponent,
  ChecklistFooterStubComponent,
  ChecklistStepsStubComponent,
  BeforeunloadStubComponent
} from '../../../tests/component-stubs';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../../services/session-storage';


import { MakeTheCourtAwareComponent } from './make-the-court-aware.component';


describe('MakeTheCourtAwareComponent', () => {
  let component: MakeTheCourtAwareComponent;
  let fixture: ComponentFixture<MakeTheCourtAwareComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:
        [
          MakeTheCourtAwareComponent,
          BackNavigationStubComponent,
          ChecklistFooterStubComponent,
          ChecklistStepsStubComponent,
          BeforeunloadStubComponent
        ],
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
    fixture = TestBed.createComponent(MakeTheCourtAwareComponent);
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
    expect(component.continue).toBeTruthy();

    expect(component.makeTheCourtAwareForm.invalid).toBeTruthy();
    const element = fixture.debugElement.query(By.css('#courtAware-error'));
    expect(element.nativeElement.innerHTML).toContain('Please answer this question');
  }));

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.AbilityToTakePart).toBeTruthy();
  }));

  it('should click on makeTheCourtAware_yes makeTheCourtAware value is Yes', () => {
    const abilityYesRadio = fixture.debugElement.query(By.css('#courtAware_yes')).nativeElement;
    abilityYesRadio.click();
    abilityYesRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.makeTheCourtAwareForm.get('courtAware');
    expect(tempControl.value).toBe('Yes');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeTruthy();
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    component.makeTheCourtAwareForm.get('moreDetails').setValue('Test details');
    expect(component.makeTheCourtAwareForm.valid).toBeTruthy();
    component.makeTheCourtAwareForm.get('moreDetails').setValue('');
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('input').value).toBe('Yes');
  });

  it('should click on makeTheCourtAware_no makeTheCourtAware value is No', () => {
    const abilityNoRadio = fixture.debugElement.query(By.css('#courtAware_no')).nativeElement;
    abilityNoRadio.click();
    abilityNoRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.makeTheCourtAwareForm.get('courtAware');
    expect(tempControl.value).toBe('No');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeFalsy();
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    expect(component.makeTheCourtAwareForm.valid).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
