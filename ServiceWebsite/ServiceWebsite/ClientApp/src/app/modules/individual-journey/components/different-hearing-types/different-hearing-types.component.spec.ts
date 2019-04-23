import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';

describe('DifferentHearingTypesComponent', () => {
  let component: DifferentHearingTypesComponent;
  let fixture: ComponentFixture<DifferentHearingTypesComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(DifferentHearingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
