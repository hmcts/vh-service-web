import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AccessToARoomComponent } from './access-to-a-room.component';
import { ChecklistFooterStubComponent, BeforeunloadStubComponent, ShowDetailsStubComponent} from 'src/tests/component-stubs';
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
import { By } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../services/session-storage';

describe('AccessToARoomComponent', () => {
  let component: AccessToARoomComponent;
  let fixture: ComponentFixture<AccessToARoomComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  const locationSpy: jasmine.SpyObj<Location> = jasmine.createSpyObj<Location>('Location', ['handle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccessToARoomComponent,
        ChecklistFooterStubComponent,
        ChecklistStepsComponent,
        BackNavigationComponent,
        BeforeunloadStubComponent,
        ShowDetailsStubComponent,
      ],
      imports: [ReactiveFormsModule],
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
    fixture = TestBed.createComponent(AccessToARoomComponent);
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
    expect(component.roomAccessForm.invalid).toBeTruthy();
    const element = fixture.debugElement.query(By.css('#roomAccess-error'));
    expect(element.nativeElement.innerHTML).toContain('Please answer this question');
  }));

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.SuitableRoom).toBeTruthy();
  }));

  it('should set answer as no when no radio button clicked', () => {
    const roomAccessNo = fixture.debugElement.query(By.css('#room-access-2')).nativeElement;
    roomAccessNo.click();
    roomAccessNo.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.roomAccessForm.get('roomAccess');
    expect(tempControl.value).toBe('No');
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    expect(component.roomAccessForm.valid).toBeTruthy();
  });

  it('should set answer as yes when yes radio button clicked', () => {
    const roomAccessYes = fixture.debugElement.query(By.css('#room-access-1')).nativeElement;
    roomAccessYes.click();
    roomAccessYes.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.roomAccessForm.get('roomAccess');
    expect(tempControl.value).toBe('Yes');
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    expect(component.roomAccessForm.valid).toBeTruthy();
  });
});
