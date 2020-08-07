import { VideoUrlService } from '../../services/video-url.service';
import { VideoViewBaseComponentDirective as VideoViewBaseComponent } from './video-view-base.component';
import { VideoFiles } from '../../services/video-files';

describe('functionality', () => {
  let component: VideoViewBaseComponent;
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

  beforeEach(() => {
    component = new VideoViewBaseComponent(videoUrlService, VideoFiles.BeforeTheDay_Court);
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
