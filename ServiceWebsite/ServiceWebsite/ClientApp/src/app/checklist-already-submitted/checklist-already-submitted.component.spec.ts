import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProfile } from '../models/user-profile.model';
import { ChecklistService } from 'src/app/services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { HearingService } from 'src/app/services/hearing.service';
import { MockHearingService } from 'src/tests/mock-hearing.service';
import {
  BackNavigationStubComponent,
  ChecklistFooterStubComponent,
  ChecklistStepsStubComponent,
  BeforeunloadStubComponent
} from '../../tests/component-stubs';
import { ChecklistAlreadySubmittedComponent } from './checklist-already-submitted.component';
import { ErrorService } from '../services/error.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';

describe('ChecklistAlreadySubmittedComponent', () => {
  let component: ChecklistAlreadySubmittedComponent;
  let fixture: ComponentFixture<ChecklistAlreadySubmittedComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:
        [
          ChecklistAlreadySubmittedComponent,
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistAlreadySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
