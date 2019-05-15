import { CanCreateComponent } from '../../pages/individual-base-component/component-test-bed.spec';
import { Type, Component, Input } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { VideoUrlService } from '../../services/video-url.service';
import { Config } from '../../../shared/models/config';
import { Logger } from 'src/app/services/logger';
import { MediaService } from '../../services/media.service';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from './../../components/user-camera-view/user-camera-view.component';

@Component({
  selector: 'app-video-view',
  template: ''
})
class StubVideoViewComponent {
  @Input()
  source: string;
}

const canCreateVideoViewBaseComponent = <T>(component: Type<T>): void => {
  CanCreateComponent(component, (configuration: TestModuleMetadata) => {
    configuration.providers.push(
      { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['getVideoFileUrlerror']) },
      { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']) },
      { provide: Config, useValue: {} },
      { provide: MediaService, useClass: UserMediaService },
    );
    configuration.declarations.push(StubVideoViewComponent);
    configuration.declarations.push(UserCameraViewComponent);
  });
};

export { canCreateVideoViewBaseComponent as CanCreateVideoViewBaseComponent };
