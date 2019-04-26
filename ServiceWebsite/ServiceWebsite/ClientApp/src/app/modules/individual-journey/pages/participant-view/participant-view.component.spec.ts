import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ParticipantViewComponent } from './participant-view.component';
import { TestModuleMetadata } from '@angular/core/testing';
import { VideoViewComponent } from '../../components/video-view/video-view.component';

describe('ParticipantViewComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ParticipantViewComponent, (config: TestModuleMetadata) => {
      config.declarations.push(VideoViewComponent);
    });
  });
});
