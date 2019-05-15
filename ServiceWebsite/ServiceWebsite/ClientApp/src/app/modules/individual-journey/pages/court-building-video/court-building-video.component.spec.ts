import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { CourtBuildingVideoComponent } from './court-building-video.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { VideoUrlService } from '../../services/video-url.service';
import { Logger } from 'src/app/services/logger';
import { Config } from '../../../shared/models/config';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-video-view',
  template: ''
})
class StubVideoViewComponent {
  @Input()
  source: string;
}

describe('CourtBuildingVideoComponent', () => {
  it('can be created', () => {
    CanCreateComponent(CourtBuildingVideoComponent,
      (configuration: TestModuleMetadata) => {
        configuration.providers.push(
          { provide: Logger, useValue: jasmine.createSpyObj<Logger>(['getVideoFileUrlerror']) },
          { provide: VideoUrlService, useValue: jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']) },
          { provide: Config, useValue: {} }
        );
        configuration.declarations.push(StubVideoViewComponent);
      }
    );
  });

  describe('functionality', () => {
    let component: CourtBuildingVideoComponent;
    const videoUrlService = jasmine.createSpyObj<VideoUrlService>(['getVideoFileUrl']);

    beforeEach(() => {
      const journey = new IndividualJourney();
      component = new CourtBuildingVideoComponent(journey, videoUrlService);
    });

    it('should set the video source when initialized', () => {
      videoUrlService.getVideoFileUrl.and.returnValue('/hearingVideo');
      component.ngOnInit();
      expect(videoUrlService.getVideoFileUrl).toHaveBeenCalled();
      expect(component.videoSource).toBeTruthy();
    });
    it('should enabled re-play when video is loaded', () => {
      expect(component.disabledReplay).toBeTruthy();
      component.videoLoaded();
      expect(component.disabledReplay).toBeFalsy();
    });
  });
});
