import { DeviceType } from '../../../base-journey/services/device-type';
import { ComponentFixture } from '@angular/core/testing';
import { IndividualJourneyComponentTestBed } from '../../pages/individual-base-component/individual-component-test-bed.spec';
import { Config } from '../../../shared/models/config';
import { Logger } from 'src/app/services/logger';
import { UserCameraViewComponent } from '../user-camera-view/user-camera-view.component';
import { Type, Component, Input } from '@angular/core';
import { VideoUrlService } from '../../services/video-url.service';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from 'src/app/services/media.service';
import { UserMediaService } from 'src/app/services/user-media.service';

@Component({
    selector: 'app-video-view',
    template: ''
  })
  class StubVideoViewComponent {
    @Input()
    source: string;
  }
  const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);

  export class VideoViewComponentTestBed {
    static createComponent<TComponent>(component: Type<TComponent>, journey?: IndividualJourney): ComponentFixture<TComponent> {
      return IndividualJourneyComponentTestBed.createComponent({ 
        component: component,
        providers: [
          { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['getVideoFileUrlerror']) },
          { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']) },
          { provide: Config, useValue: {} },
          { provide: MediaService, useClass: UserMediaService },
          { provide: DeviceType, useValue: deviceType },
        ],
        declarations: [
          StubVideoViewComponent,
          UserCameraViewComponent
        ],
        journey: journey
      });
    }
  }

