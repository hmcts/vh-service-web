import { JudgeViewComponent } from './judge-view.component';
import { MediaService } from '../../services/media.service';
import { VideoUrlService } from '../../services/video-url.service';
import { IndividualJourney } from '../../individual-journey';
import { MutableIndividualSuitabilityModel } from './../../mutable-individual-suitability.model';
import { CanCreateHearingViewComponent } from '../../components/hearing-view-base.component.spec';

describe('JudgeViewComponent', () => {
  it('can be created', () => {
    CanCreateHearingViewComponent(JudgeViewComponent);
  });

  describe('functionality', () => {
    let component: JudgeViewComponent;
    const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);
    const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['judgeSelfViewVideo', 'otherParticipantExampleVideo']);
    const mediaStream = new MediaStream();

    beforeEach(() => {
      const journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
      component = new JudgeViewComponent(journey, userMediaService, videoUrlService);
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
      videoUrlService.otherParticipantExampleVideo.and.returnValue('/participantVideo');
      videoUrlService.judgeSelfViewVideo.and.returnValue('/judgeVideo');
      component.ngOnInit();
      expect(component.videoSourceParticipant).toBeTruthy();
      expect(component.videoSourceJudge).toBeTruthy();
    });
    it('should enabled re-play when video is loaded', () => {
      expect(component.disabledReplay).toBeTruthy();

      component.videoLoaded();
      expect(component.disabledReplay).toBeFalsy();
    });
  });
});
