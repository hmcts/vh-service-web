import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Config } from '../../../shared/models/config';
import { ParticipantViewComponent } from './participant-view.component';
import { MediaService } from '../../services/media.service';
import { UserMediaService } from '../../services/user-media.service';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { async } from '@angular/core/testing';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { Logger } from 'src/app/services/logger';

@Component({
  selector: 'app-video-view',
  template: ''
})
class StubVideoViewComponent {
  @Input()
  source: string;
}

describe('ParticipantViewComponent', () => {
  const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

  it('can be created', async(() => {
    CanCreateComponent(ParticipantViewComponent,
      (configuration: TestModuleMetadata) => {
        configuration.providers.push(
          { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['getVideoFileUrlerror']) },
          { provide: MediaService, useClass: UserMediaService },
          { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']) },
          { provide: Config, useValue: {} }
        );
        configuration.declarations.push(UserCameraViewComponent);
        configuration.declarations.push(StubVideoViewComponent);
      }
    );
  }));

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const mediaStream = new MediaStream();

    beforeEach(() => {
      const journey = new IndividualJourney();
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService);
      component.userCameraViewComponent = jasmine.createSpyObj<UserCameraViewComponent>(['setSource']);
    });

    it('should set the video source to a media stream when initialized', async () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();
      expect(userMediaService.getStream).toHaveBeenCalled();
    });

    it('should stop use camera on destroy', async () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();

      component.ngOnDestroy();
      expect(userMediaService.stopStream).toHaveBeenCalled();
    });
    it('should assign url to video sources', () => {
      videoUrlService.getVideoFileUrl.and.returnValue('/hearingVideo');
      component.ngOnInit();
      expect(component.videoSource).toBeTruthy();
    });
    it('should enabled re-play when video is loaded', () => {
      expect(component.disabledReplay).toBeTruthy();

      component.videoLoaded();
      expect(component.disabledReplay).toBeFalsy();
    });
  });
});
