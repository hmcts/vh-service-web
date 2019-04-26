import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ParticipantViewComponent } from './participant-view.component';
import { TestModuleMetadata, TestBed } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { Component, Input } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualSuitabilityModel} from '../../individual-suitability.model';

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

class StepMock extends IndividualSuitabilityModel {
}

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ParticipantViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['get']) }
      );
      configuration.declarations.push(StubUserCameraViewComponent);
      configuration.declarations.push(StubAudioBarComponent);
      configuration.declarations.push(StubContactUsComponent);

    });
  });

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    const journey = new IndividualJourney(new StepMock());
    const userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream']);

    const mediaStream = new MediaStream();

    beforeEach(() => {
      component = new ParticipantViewComponent(journey, userMediaService);
    });
    it('should get source for video', () => {
      userMediaService.getStream.and.returnValue(new Promise<MediaStream>((resolve, reject) => { resolve(mediaStream); }));
      component.ngAfterContentInit();
      expect(userMediaService.getStream).toHaveBeenCalled();
    });
    it('should stop use camera on destroy', () => {
      userMediaService.getStream.and.returnValue(new Promise<MediaStream>((resolve, reject) => { resolve(mediaStream); }));
      component.ngAfterContentInit();

      component.ngOnDestroy();
      expect(userMediaService.stopStream).toHaveBeenCalled();
    });
  });
});
