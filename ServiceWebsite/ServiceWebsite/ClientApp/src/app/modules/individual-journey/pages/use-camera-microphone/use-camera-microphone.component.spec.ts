import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';

describe('UseCameraMicrophoneComponent', () => {
  let mediaService: jasmine.SpyObj<MediaService>;
  let individualJourney: jasmine.SpyObj<IndividualJourney>;

  beforeEach(() => {
    mediaService = jasmine.createSpyObj<MediaService>(['requestAccess']);
    individualJourney = jasmine.createSpyObj<IndividualJourney>(['next', 'fail']);
  });

  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: UseCameraMicrophoneComponent,
      providers: [ { provide: MediaService, useValue: mediaService } ]
    });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call fail when access denied', async () => {
    mediaService.requestAccess.and.returnValue(Promise.resolve(false));
    const component = new UseCameraMicrophoneComponent(individualJourney, mediaService);
    await component.switchOnMedia();
    expect(individualJourney.fail).toHaveBeenCalled();
  });
});
