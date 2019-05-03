import { VideoViewComponent } from './video-view.component';
import { LoggerService } from 'src/app/services/logger.service';

describe('VideoViewComponent', () => {
  it('should emit loaded event', () => {
    const logger = jasmine.createSpyObj<LoggerService>(['error']);
    const videoViewComponent = new VideoViewComponent(logger);
    spyOn(videoViewComponent.loaded, 'emit');
    videoViewComponent.readyToPlay();
    expect(videoViewComponent.loaded.emit).toHaveBeenCalled();
  });

  it('should set video unvailable on error', () => {
    const logger = jasmine.createSpyObj<LoggerService>(['error']);
    const videoViewComponent = new VideoViewComponent(logger);
    videoViewComponent.onVideoError();
    expect(videoViewComponent.videoUnavailable).toBeTruthy();
  });
});
