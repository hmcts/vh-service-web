import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { BeforeunloadComponent } from './beforeunload.component';

describe('BeforeunloadComponent', () => {
  let component: BeforeunloadComponent;
  let fixture: ComponentFixture<BeforeunloadComponent>;
  const spychecklistSessionService: jasmine.SpyObj<ChecklistSessionService> = jasmine.createSpyObj<ChecklistSessionService>('ChecklistSessionService', ['isChecklistInStorage']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeforeunloadComponent],
      providers: [{ provide: ChecklistSessionService, useValue: spychecklistSessionService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spychecklistSessionService.isChecklistInStorage.and.returnValue(true);

    fixture = TestBed.createComponent(BeforeunloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
