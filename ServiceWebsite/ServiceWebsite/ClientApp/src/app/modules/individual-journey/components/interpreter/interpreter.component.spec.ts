import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { InterpreterComponent } from './interpreter.component';

describe('InterpreterComponent', () => {
  let component: InterpreterComponent;
  let fixture: ComponentFixture<InterpreterComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(InterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
