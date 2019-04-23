import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { CourtBuildingVideoComponent } from './court-building-video.component';

describe('CourtBuildingVideoComponent', () => {
  let component: CourtBuildingVideoComponent;
  let fixture: ComponentFixture<CourtBuildingVideoComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(CourtBuildingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
