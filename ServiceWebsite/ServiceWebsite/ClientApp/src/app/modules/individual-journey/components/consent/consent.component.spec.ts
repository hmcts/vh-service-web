import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { ConsentComponent } from './consent.component';

describe('ConsentComponent', () => {
  let component: ConsentComponent;
  let fixture: ComponentFixture<ConsentComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(ConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
