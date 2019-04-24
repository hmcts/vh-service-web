import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaAccessService } from '../../services/media-access.service';

describe('UseCameraMicrophoneComponent', () => {
  it('can be created', () => {
    const mediaAccessService = jasmine.createSpyObj<MediaAccessService>(['requestAccess']);
    CanCreateComponent(UseCameraMicrophoneComponent,
      (config: TestModuleMetadata) => config.providers.push(
        { provide: MediaAccessService, useValue: mediaAccessService }
      ));
  });
});
