import { AudioBarComponent } from './audio-bar/audio-bar.component';
import { UserCameraViewComponent } from './user-camera-view/user-camera-view.component';
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

const canCreateHearingViewComponent = <T>(component: Type<T>): void => {
  const videoUrls = [ 'getVideoFileUrl'];
  CanCreateComponent(component, (configuration: TestModuleMetadata) => {
    configuration.providers.push(
      { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['error']) },
      { provide: MediaService, useClass: UserMediaService },
      { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(videoUrls) },
      { provide: Config, useValue: {} }
    );
    configuration.declarations.push(UserCameraViewComponent);
    configuration.declarations.push(AudioBarComponent);
    configuration.declarations.push(StubVideoViewComponent);
  });
};

export { canCreateHearingViewComponent as CanCreateHearingViewComponent };
