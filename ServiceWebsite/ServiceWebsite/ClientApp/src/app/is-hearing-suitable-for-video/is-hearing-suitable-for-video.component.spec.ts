import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
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
import { By } from '@angular/platform-browser';
import { BackNavigationStubComponent, ChecklistFooterStubComponent, ChecklistStepsStubComponent } from '../../tests/component-stubs';
import { IsHearingSuitableForVideoComponent } from './is-hearing-suitable-for-video.component';
import { Observable, from } from 'rxjs';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../services/session-storage';

describe('IsHearingSuitableForVideoComponent', () => {
  let component: IsHearingSuitableForVideoComponent;
  let fixture: ComponentFixture<IsHearingSuitableForVideoComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:
        [
          IsHearingSuitableForVideoComponent,
          BackNavigationStubComponent,
          ChecklistFooterStubComponent,
          ChecklistStepsStubComponent
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
        {
          provide: ActivatedRoute, useValue: { params: from([{ edit: true }]) }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsHearingSuitableForVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.UseSameComputer).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fail validation when form empty', () => {
    expect(component.isSuitableForm.invalid).toBeTruthy();
    const tempControl = component.isSuitableForm.get('suitability');
    const temp = tempControl.value;
    /* tslint:disable:no-unused-expression */
    expect(temp).toBeNull;
  });
  it('should click on suitability_yes suitability value is Yes', () => {
    const suitabilityYesRadio = fixture.debugElement.query(By.css('#suitability_yes')).nativeElement;
    suitabilityYesRadio.click();
    suitabilityYesRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.isSuitableForm.get('suitability');
    expect(tempControl.value).toBe('Yes');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeFalsy();
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    expect(component.isSuitableForm.valid).toBeTruthy();
    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('input').value).toBe('Yes');
  });
  it('should click on suitability_no suitability value is No', () => {
    const suitabilityNoRadio = fixture.debugElement.query(By.css('#suitability_no')).nativeElement;
    suitabilityNoRadio.click();
    suitabilityNoRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.isSuitableForm.get('suitability');
    expect(tempControl.value).toBe('No');
    expect(fixture.debugElement.query(By.css('#moreDetails'))).toBeTruthy();
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    component.isSuitableForm.get('moreDetails').setValue('Test details');

    expect(component.isSuitableForm.valid).toBeTruthy();
    component.isSuitableForm.get('moreDetails').setValue('');
  });
});
