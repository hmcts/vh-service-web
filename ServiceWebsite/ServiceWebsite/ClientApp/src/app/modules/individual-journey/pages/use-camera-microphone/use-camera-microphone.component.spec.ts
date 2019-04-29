import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { TestModuleMetadata } from '@angular/core/testing';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { ShowDetailsComponent } from 'src/app/modules/shared/show-details/show-details.component';
import { ContactUsComponent } from 'src/app/modules/shared/contact-us/contact-us.component';

describe('UseCameraMicrophoneComponent', () => {
  let mediaService: jasmine.SpyObj<MediaService>;
let individualJourney: jasmine.SpyObj<IndividualJourney>;
beforeEach(() => {
  mediaService = jasmine.createSpyObj<MediaService>(['requestAccess']);
  individualJourney = jasmine.createSpyObj<IndividualJourney>(['next', 'fail']);
 });

  it('can be created', () => {

    CanCreateComponent(UseCameraMicrophoneComponent,
      (config: TestModuleMetadata) => {
        config.providers.push(
          { provide: MediaService, useValue: mediaService }
        );
        config.declarations.push([ShowDetailsComponent, ContactUsComponent]);
      });
  });

  it('should call fail when access denied', async() => {
    mediaService.requestAccess.and.returnValue(Promise.resolve(false));
    const component = new UseCameraMicrophoneComponent(individualJourney, mediaService);
    await component.switchOnMedia();
    expect(individualJourney.fail).toHaveBeenCalled();
  });
});
