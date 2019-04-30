import { UserMediaService } from './../services/user-media.service';
import { CanCreateComponent } from '../pages/individual-base-component/component-test-bed.spec';
import { Type, Component, Input } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../services/media.service';
import { VideoUrlService } from '../services/video-url.service';
import { Config } from '../../shared/models/config';
import { Logger } from 'src/app/services/logger';

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
  audioBarWidth: number;
}

@Component({
  selector: 'app-contact-us',
  template: ''
})
class StubContactUsComponent {
}

const canCreateHearingViewComponent = <T>(component: Type<T>): void => {
  const videoUrls = [ 'inHearingExampleVideo', 'judgeSelfViewVideo', 'otherParticipantExampleVideo' ];
  CanCreateComponent(component, (configuration: TestModuleMetadata) => {
    configuration.providers.push(
      { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['error']) },
      { provide: MediaService, useClass: UserMediaService },
      { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(videoUrls) },
      { provide: Config, useValue: {} }
    );
    configuration.declarations.push(StubUserCameraViewComponent);
    configuration.declarations.push(StubAudioBarComponent);
    configuration.declarations.push(StubContactUsComponent);
    configuration.declarations.push(StubVideoViewComponent);
  });
};

export { canCreateHearingViewComponent as CanCreateHearingViewComponent };
