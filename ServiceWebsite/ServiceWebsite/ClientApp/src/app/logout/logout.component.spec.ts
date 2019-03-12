import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AdalService } from 'adal-angular4';
import { RouterTestingModule } from '@angular/router/testing';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  const adalSpy = jasmine.createSpyObj('AdalService', ['userInfo']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AdalService, useValue: adalSpy },
        { provide: ChecklistSessionService, useClass: MockChecklistSessionService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
