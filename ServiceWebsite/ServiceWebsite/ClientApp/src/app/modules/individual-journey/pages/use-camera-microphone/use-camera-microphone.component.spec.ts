import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { TestModuleMetadata, async,TestBed,ComponentFixture } from '@angular/core/testing';
import { MediaAccessService } from '../../services/media-access.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IndividualJourney } from '../../individual-journey';
import { ShowDetailsComponent } from 'src/app/modules/shared/show-details/show-details.component';

describe('UseCameraMicrophoneComponent', () => {
let mediaAccessService : jasmine.SpyObj<MediaAccessService>;
let individualJourney : jasmine.SpyObj<IndividualJourney>;
beforeEach(() => {
  mediaAccessService = jasmine.createSpyObj<MediaAccessService>(['requestAccess']);
  individualJourney = jasmine.createSpyObj<IndividualJourney>(['next','fail']);
 });

  it('can be created', () => {
    
    CanCreateComponent(UseCameraMicrophoneComponent,
      (config: TestModuleMetadata) => {
        config.providers.push(
          { provide: MediaAccessService, useValue: mediaAccessService }
        );
        config.declarations.push(ShowDetailsComponent);
      });
  });

  it('should call fail when access denied', async() => {
    mediaAccessService.requestAccess.and.returnValue(Promise.resolve(false));
    const component = new UseCameraMicrophoneComponent(individualJourney,mediaAccessService)
    await component.switchOnMedia();
    expect(individualJourney.fail).toHaveBeenCalled();
  });
});
