import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ParticipantViewComponent } from './participant-view.component';
import { TestModuleMetadata, TestBed } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { Component, Input } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'app-user-camera-view',
  template: ''
})
class StubUserCameraViewComponent {
  @Input()
  videoWidth: string;
}

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ParticipantViewComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push(
        { provide: MediaService, useValue: jasmine.createSpyObj<MediaService>(['get']) }
      );
      configuration.declarations.push(StubUserCameraViewComponent);
    });
  });

  describe('functionality', () => {
    let component: ParticipantViewComponent;
    let journey: IndividualJourney;
    let userMediaService = jasmine.createSpyObj<MediaService>(['getStream', 'stopStream'])
    let loggerService = jasmine.createSpyObj<LoggerService>(['error']);
    beforeEach(() => {
      component = new ParticipantViewComponent(journey, userMediaService, loggerService);  
    });
    it('should get source for video', () => {
      userMediaService.getStream.and.returnValue(new Promise<MediaStream>((resolve, reject) => { resolve(new MediaStream()); }));
      component.ngAfterContentInit();
      expect(component.stream).toBeTruthy();
    });
  });
});
