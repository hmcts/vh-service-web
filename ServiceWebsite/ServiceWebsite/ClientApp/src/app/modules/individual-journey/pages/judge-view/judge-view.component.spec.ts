import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { JudgeViewComponent } from './judge-view.component';
import { Component, Input } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';

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

describe('JudgeViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(JudgeViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['get']) },
        { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['judgeSelfViewVideo']) }
      );
      configuration.declarations.push(StubUserCameraViewComponent);
      configuration.declarations.push(StubAudioBarComponent);
      configuration.declarations.push(StubContactUsComponent);
      configuration.declarations.push(StubVideoViewComponent);
    });
  });
});
