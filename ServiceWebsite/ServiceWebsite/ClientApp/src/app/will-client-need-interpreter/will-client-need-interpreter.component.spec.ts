import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router} from '@angular/router';
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
import { browser } from 'protractor';
import { exists } from 'fs';
import { WillClientNeedInterpreterComponent } from './will-client-need-interpreter.component';
import { BackNavigationStubComponent, ChecklistFooterStubComponent, ChecklistStepsStubComponent } from '../../tests/component-stubs';
import { Observable } from 'rxjs/Rx';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../services/session-storage';

describe('WillClientNeedIntepreterComponent', () => {
  let component: WillClientNeedInterpreterComponent;
  let fixture: ComponentFixture<WillClientNeedInterpreterComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:
        [
          WillClientNeedInterpreterComponent,
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
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(WillClientNeedInterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve checklist from storage', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.ClientNeedInterpreter).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if the form is submitted and invalid', fakeAsync(() => {
    component.continue();
    fixture.detectChanges();
    tick();
    expect(component.continue).toBeTruthy();
    expect(component.needInterpreterForm.invalid).toBeTruthy();
    const element = fixture.debugElement.query(By.css('#needInterpreter-error'));
    expect(element.nativeElement.innerHTML).toContain('Please answer this question');
  }));

  it('should click on needInterpreter_yes needInterpreter value is Yes', () => {
    const needInterpreterYesRadio = fixture.debugElement.query(By.css('#needInterpreter_yes')).nativeElement;
    needInterpreterYesRadio.click();
    needInterpreterYesRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.needInterpreterForm.get('needInterpreter');
    expect(tempControl.value).toBe('Yes');
    expect(component.selectedAnswer.toLowerCase()).toBe('yes');
    expect(component.needInterpreterForm.valid).toBeTruthy();

    const el = fixture.debugElement.nativeElement;
    expect(el.querySelector('input').value).toBe('Yes');
  });

  it('should click on needInterpreter_no needInterpreter value is No', () => {

    const needInterpreterNoRadio = fixture.debugElement.query(By.css('#needInterpreter_no')).nativeElement;
    needInterpreterNoRadio.click();
    needInterpreterNoRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const tempControl = component.needInterpreterForm.get('needInterpreter');
    expect(tempControl.value).toBe('No');
    expect(component.selectedAnswer.toLowerCase()).toBe('no');
    expect(component.needInterpreterForm.valid).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
