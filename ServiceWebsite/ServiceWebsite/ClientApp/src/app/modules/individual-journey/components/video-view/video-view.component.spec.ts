import { VideoViewComponent } from './video-view.component';

describe('VideoViewComponent', () => {
  it('should emit loaded event', () => {
    const videoViewComponent = new VideoViewComponent();
    spyOn(videoViewComponent.loaded, 'emit');
    videoViewComponent.readyToPlay();
    expect(videoViewComponent.loaded.emit).toHaveBeenCalled();
  });

  it('should set video unvailable on error', () => {
    const videoViewComponent = new VideoViewComponent();
    videoViewComponent.videoError();
    expect(videoViewComponent.videoUnavailable).toBeTruthy();
  });
});
