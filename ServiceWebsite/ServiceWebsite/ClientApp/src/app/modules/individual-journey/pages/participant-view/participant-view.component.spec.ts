import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';
import { ParticipantViewComponent } from './participant-view.component';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { async } from '@angular/core/testing';
import { CanCreateVideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component.spec';
import { DeviceType } from '../../services/device-type';
import { IndividualStepsOrderFactory } from '../../individual-steps-order.factory';

describe('ParticipantViewComponent', () => {
  const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
  const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);

  it('can be created', async(() => {
    CanCreateVideoViewBaseComponent(ParticipantViewComponent);
  }));

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const mediaStream = new MediaStream();

    beforeEach(() => {
      deviceType.isMobile.and.returnValue(false);
      const journey = new IndividualJourney(individualStepsOrderFactory);
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService, deviceType);
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
    it('should detect that device is not a mobile phone', () => {
      expect(component.isMobile).toBeFalsy();
    });
    it('should detect that device is a mobile phone and not use media', async() => {
      deviceType.isMobile.and.returnValue(true);
      const journey = new IndividualJourney(individualStepsOrderFactory);
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService, deviceType);
      component.userCameraViewComponent = jasmine.createSpyObj<UserCameraViewComponent>(['setSource']);

      await component.ngAfterContentInit();
      expect(component.isMobile).toBeTruthy();
      expect(component.stream).toBeFalsy();
    });
  });
});
