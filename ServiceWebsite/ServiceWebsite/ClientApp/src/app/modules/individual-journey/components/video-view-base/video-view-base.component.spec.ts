import { CanCreateComponent } from '../../pages/individual-base-component/component-test-bed.spec';
import { Type, Component, Input } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { VideoUrlService } from '../../services/video-url.service';
import { Config } from '../../../shared/models/config';
import { Logger } from 'src/app/services/logger';
import { MediaService } from '../../services/media.service';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';
import { VideoViewBaseComponent } from './video-view-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-video-view',
  template: ''
})
class StubVideoViewComponent {
  @Input()
  source: string;
}

const canCreateVideoViewBaseComponent = <T>(component: Type<T>): void => {
  CanCreateComponent(component, (configuration: TestModuleMetadata) => {
    configuration.providers.push(
      { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['getVideoFileUrlerror']) },
      { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']) },
      { provide: Config, useValue: {} },
      { provide: MediaService, useClass: UserMediaService },
    );
    configuration.declarations.push(StubVideoViewComponent);
    configuration.declarations.push(UserCameraViewComponent);
  });
};

describe('functionality', () => {
  let component: VideoViewBaseComponent;
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

  beforeEach(() => {
    const journey = new IndividualJourney();
    component = new VideoViewBaseComponent(journey, videoUrlService);
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

export { canCreateVideoViewBaseComponent as CanCreateVideoViewBaseComponent };
