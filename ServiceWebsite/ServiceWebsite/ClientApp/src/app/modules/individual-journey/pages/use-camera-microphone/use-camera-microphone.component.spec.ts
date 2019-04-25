import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { TestModuleMetadata, async,TestBed,ComponentFixture } from '@angular/core/testing';
import { MediaAccessService } from '../../services/media-access.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('UseCameraMicrophoneComponent', () => {
let mediaAccessService : jasmine.SpyObj<MediaAccessService>;
beforeEach(() => {
  mediaAccessService = jasmine.createSpyObj<MediaAccessService>(['requestAccess']);
 });

  it('can be created', () => {
    
    CanCreateComponent(UseCameraMicrophoneComponent,
      (config: TestModuleMetadata) => config.providers.push(
        { provide: MediaAccessService, useValue: mediaAccessService }
      ));
  });

  it('should call fail when access denied', async() => {
    mediaAccessService.requestAccess.and.returnValue(Promise.resolve(false));
    const component = new UseCameraMicrophoneComponent(mediaAccessService)
    await component.switchOnMedia();
  });
});
