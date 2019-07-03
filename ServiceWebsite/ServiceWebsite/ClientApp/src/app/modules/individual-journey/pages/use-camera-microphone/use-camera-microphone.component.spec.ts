import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';
import { MutableIndividualSuitabilityModel } from '../../mutable-individual-suitability.model';

describe('UseCameraMicrophoneComponent', () => {
  let mediaService: jasmine.SpyObj<MediaService>;
  let individualJourney: jasmine.SpyObj<IndividualJourney>;
  let model: IndividualSuitabilityModel;

  beforeEach(() => {
    model = new MutableIndividualSuitabilityModel();
    mediaService = jasmine.createSpyObj<MediaService>(['requestAccess']);
    individualJourney = {
      model: model,
      ...jasmine.createSpyObj<IndividualJourney>(['next', 'fail'])
    } as jasmine.SpyObj<IndividualJourney>;
  });

  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: UseCameraMicrophoneComponent,
      providers: [ { provide: MediaService, useValue: mediaService } ]
    });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should proceed with access denied on failure', async () => {
    mediaService.requestAccess.and.returnValue(Promise.resolve(false));
    const component = new UseCameraMicrophoneComponent(individualJourney, mediaService);
    await component.switchOnMedia();
    expect(individualJourney.next).toHaveBeenCalled();
    expect(model.mediaAccepted).toBe(false);
  });
});
