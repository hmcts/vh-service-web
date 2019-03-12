import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ChecklistConsentComponent } from './checklist-consent.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Location } from '@angular/common';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { HearingService } from '../services/hearing.service';
import { MockHearingService } from 'src/tests/mock-hearing.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { ChecklistService } from '../services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { Router} from '@angular/router';
import { BackNavigationStubComponent, ChecklistFooterStubComponent, BeforeunloadStubComponent } from 'src/tests/component-stubs';
import { SessionStorage } from '../services/session-storage';

describe('ChecklistConsentComponent', () => {
  let component: ChecklistConsentComponent;
  let fixture: ComponentFixture<ChecklistConsentComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let locationSpy: jasmine.SpyObj<Location>;

  let storageSpy: jasmine.SpyObj<SessionStorage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChecklistConsentComponent,
        ChecklistFooterStubComponent,
        BackNavigationStubComponent,
        BeforeunloadStubComponent,
      ],
       imports: [
        FormsModule,
       ],
       providers: [
         { provide: Router, useValue: routerSpy },
         { provide: Location, useValue: locationSpy },
         { provide: ProfileService, useClass: MockProfileService },
         { provide: HearingService, useClass: MockHearingService },
         { provide: ChecklistSessionService, useClass: MockChecklistSessionService },
         { provide: ChecklistService, useClass: MockChecklistService },
         { provide: SessionStorage, useValue: storageSpy },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
