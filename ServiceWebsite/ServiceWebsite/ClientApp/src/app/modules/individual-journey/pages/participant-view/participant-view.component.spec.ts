import { MutableIndividualSuitabilityModel } from './../../mutable-individual-suitability.model';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ParticipantViewComponent } from './participant-view.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import {ContactUsComponent} from '../../../shared/contact-us/contact-us.component';

@Component({
  selector: 'app-user-camera-view',
  template: ''
})
class StubUserCameraViewComponent {
  @Input()
  videoWidth: string;

  @ViewChild('videoBox')
  videoBox: ElementRef;

  stream: MediaStream;
  setSource(stream: MediaStream) 
  {

  }
}

@Component({
  selector: 'app-audio-bar',
  template: ''
})
class StubAudioBarComponent {
  @Input()
  audioBarWidth: string;

  @ViewChild('visualizer')
  visualizer: ElementRef;

  audioContext: AudioContext;
  widthCanvas: number;
  heightCanvas: number;
  canvasContext: CanvasRenderingContext2D;
  volume = 1;
  colorAudio = '#006435';
  setSource(stream: MediaStream) {
  }
}

@Component({
  selector: 'app-contact-us',
  template: ''
})
class StubContactUsComponent {
 
}

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ParticipantViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['getStream', 'stopStream', 'requestAccess']) }
      );
      configuration.declarations.push(UserCameraViewComponent);
      configuration.declarations.push(AudioBarComponent);
      configuration.declarations.push(ContactUsComponent);

    });
  });

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream', 'requestAccess']);
    const mediaStream = new MediaStream();
    const audioBarComponentSpy = jasmine.createSpyObj<AudioBarComponent>(['setSource']);
    const userCameraViewComponentSpy = jasmine.createSpyObj<UserCameraViewComponent>(['setSource']);
    beforeEach(() => {
      const journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
      component = new ParticipantViewComponent(journey, userMediaService);
      component.userCameraViewComponent = userCameraViewComponentSpy;
      component.audioBarComponent = audioBarComponentSpy;
      
    });

    it('should set the video source to a media stream when initialized', async() => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();
      expect(userMediaService.getStream).toHaveBeenCalled();
    });

    it('should stop use camera on destroy', async() => {
      userMediaService.getStream.and.returnValue(Promise.resolve(mediaStream));
      await component.ngAfterContentInit();

      component.ngOnDestroy();
      expect(userMediaService.stopStream).toHaveBeenCalled();
    });
  });
});
