import { VideoUrlService } from '../../services/video-url.service';
import { VideoViewBaseComponent } from './video-view-base.component';
import { VideoFiles } from '../../services/video-files';
import { IndividualJourneyStubs } from '../../pages/individual-base-component/individual-component-test-bed.spec';

describe('functionality', () => {
  let component: VideoViewBaseComponent;
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

  beforeEach(() => {
    const journey = IndividualJourneyStubs.default;
    component = new VideoViewBaseComponent(journey, videoUrlService, VideoFiles.BeforeTheDay_Court);
  });

  it('should set the video source when initialized', () => {
    videoUrlService.getVideoFileUrl.and.returnValue('/hearingVideo');
    component.ngOnInit();
    expect(videoUrlService.getVideoFileUrl).toHaveBeenCalled();
    expect(component.videoSource).toBeTruthy();
  });
  it('should enabled re-play when video is loaded', () => {
    expect(component.disabledReplay).toBeTruthy();
    component.videoLoaded();
    expect(component.disabledReplay).toBeFalsy();
  });
});
