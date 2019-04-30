import { MutableIndividualSuitabilityModel } from './../../mutable-individual-suitability.model';
import { ParticipantViewComponent } from './participant-view.component';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { CanCreateHearingViewComponent } from '../../components/hearing-view-base.component.spec';

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateHearingViewComponent(ParticipantViewComponent);
  });

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
    const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['inHearingExampleVideo']);
    const mediaStream = new MediaStream();

    beforeEach(() => {
      const journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
      component = new ParticipantViewComponent(journey, userMediaService, videoUrlService);
    });

    it('should set the video source to a media stream when initialized', () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      component.ngAfterContentInit();
      expect(userMediaService.getStream).toHaveBeenCalled();
    });

    it('should stop use camera on destroy', () => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      component.ngAfterContentInit();

      component.ngOnDestroy();
      expect(userMediaService.stopStream).toHaveBeenCalled();
    });
    it('should assign url to video sources', () => {
      videoUrlService.inHearingExampleVideo.and.returnValue('/hearingVideo');
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
