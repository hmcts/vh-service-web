import { VideoViewComponent } from './video-view.component';
import { Logger } from 'src/app/services/logger';
import { ElementRef } from '@angular/core';

class MockElementRef implements ElementRef {
  nativeElement = {
    pause: function () { },
    currentTime: 10,
    muted: false,
    removeAttribute: function () { this.src = ''; },
    srcObject: 'source',
    src: 'source',
  };

}
describe('VideoViewComponent', () => {
  it('should emit loaded event', () => {
    const logger = jasmine.createSpyObj<Logger>(['error']);
    const videoViewComponent = new VideoViewComponent(logger);
    spyOn(videoViewComponent.loaded, 'emit');
    videoViewComponent.readyToPlay();
    expect(videoViewComponent.loaded.emit).toHaveBeenCalled();
  });

  it('should set video unavailable on error', () => {
    const logger = jasmine.createSpyObj<Logger>(['error']);
    const videoViewComponent = new VideoViewComponent(logger);
    videoViewComponent.onVideoError();
    expect(videoViewComponent.videoUnavailable).toBeTruthy();
  });

  it('should stop plying video and reset current time to 0 on video tag', () => {
    const logger = jasmine.createSpyObj<Logger>(['error']);
    const videoViewComponent = new VideoViewComponent(logger);
    const mockElement = new MockElementRef();
    mockElement.nativeElement.srcObject = null;

    videoViewComponent.videoElement = mockElement;

    videoViewComponent.ngOnDestroy();
    expect(videoViewComponent.videoElement.nativeElement.currentTime).toBe(0);
  });
});
