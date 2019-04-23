import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';

describe('DifferentHearingTypesComponent', () => {
  let component: DifferentHearingTypesComponent;
  let fixture: ComponentFixture<DifferentHearingTypesComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(DifferentHearingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
