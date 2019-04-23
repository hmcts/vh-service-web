import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';
import { ExploreCourtBuildingComponent } from './explore-court-building.component';

describe('ExploreCourtBuildingComponent', () => {
  let component: ExploreCourtBuildingComponent;
  let fixture: ComponentFixture<ExploreCourtBuildingComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(ExploreCourtBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
