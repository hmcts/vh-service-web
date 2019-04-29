import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { JudgeViewComponent } from './judge-view.component';
import { Component, Input } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { Config } from '../../../shared/models/config';
import { VideoUrlService } from '../../services/video-url.service';
import { IndividualJourney } from '../../individual-journey';
import { MutableIndividualSuitabilityModel } from './../../mutable-individual-suitability.model';

@Component({
  selector: 'app-video-view',
  template: ''
})
class StubVideoViewComponent {
  @Input()
  source: string;
}

@Component({
  selector: 'app-user-camera-view',
  template: ''
})
class StubUserCameraViewComponent {
  @Input()
  videoWidth: string;
}

@Component({
  selector: 'app-audio-bar',
  template: ''
})
class StubAudioBarComponent {
  @Input()
  audioBarWidth: string;
}

@Component({
  selector: 'app-contact-us',
  template: ''
})
class StubContactUsComponent {
}

class ConfigStub { }

describe('JudgeViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(JudgeViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['get']) },
        { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['judgeSelfViewVideo']) },
        { provide: Config, useClass: ConfigStub }
      );
      configuration.declarations.push(StubUserCameraViewComponent);
      configuration.declarations.push(StubAudioBarComponent);
      configuration.declarations.push(StubContactUsComponent);
      configuration.declarations.push(StubVideoViewComponent);
    });
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
