import { CourtBuildingVideoComponent } from './court-building-video.component';
import { VideoViewComponentTestBed } from '../../components/video-view-base/video-view-component-test-bed.spec';

describe('CourtBuildingVideoComponent', () => {
  it('can be created', (() => {
    const fixture = VideoViewComponentTestBed.createComponent(CourtBuildingVideoComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));
});
