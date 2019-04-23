import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';
import { ExploreVideoHearingComponent } from './explore-video-hearing.component';

describe('ExploreVideoHearingComponent', () => {
  let component: ExploreVideoHearingComponent;
  let fixture: ComponentFixture<ExploreVideoHearingComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(ExploreVideoHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
