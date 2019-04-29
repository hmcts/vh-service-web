import { MutableIndividualSuitabilityModel } from './../../mutable-individual-suitability.model';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ParticipantViewComponent } from './participant-view.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { Component, Input } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';

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

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ParticipantViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['getStream', 'stopStream', 'requestAccess']) }
      );
      configuration.declarations.push(StubUserCameraViewComponent);
      configuration.declarations.push(StubAudioBarComponent);
      configuration.declarations.push(StubContactUsComponent);

    });
  });

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream', 'requestAccess']);
    const mediaStream = new MediaStream();
    userMediaService.getStream.and.returnValue(mediaStream);
    beforeEach(() => {
      const journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
      component = new ParticipantViewComponent(journey, userMediaService);
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
  });
});
