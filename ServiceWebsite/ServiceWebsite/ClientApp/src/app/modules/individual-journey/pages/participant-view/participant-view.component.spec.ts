import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';
import { ParticipantViewComponent } from './participant-view.component';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { async } from '@angular/core/testing';
import { CanCreateVideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component.spec';

describe('ParticipantViewComponent', () => {
  const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
  const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

  it('can be created', async(() => {
    CanCreateVideoViewBaseComponent(ParticipantViewComponent);
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
  });
});
