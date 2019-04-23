import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterComponent } from './interpreter.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('InterpreterComponent', () => {
  let component: InterpreterComponent;
  let fixture: ComponentFixture<InterpreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
