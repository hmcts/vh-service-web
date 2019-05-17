import { CourtBuildingVideoComponent } from './court-building-video.component';
import { CanCreateVideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component.spec';

describe('CourtBuildingVideoComponent', () => {
  it('can be created', (() => {
    CanCreateVideoViewBaseComponent(CourtBuildingVideoComponent);
  }));
});
