import { IndividualJourneySteps } from './../../individual-journey-steps';
import { UseCameraMicrophoneComponent } from './use-camera-microphone.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { IndividualJourney } from '../../individual-journey';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';
import { MutableIndividualSuitabilityModel } from '../../mutable-individual-suitability.model';
import { By } from '@angular/platform-browser';
import { tick, fakeAsync } from '@angular/core/testing';
import { MediaService } from 'src/app/services/media.service';
import { MediaAccessResponse } from 'src/app/modules/base-journey/participant-suitability.model';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('UseCameraMicrophoneComponent', () => {
  let mediaService: jasmine.SpyObj<MediaService>;
  let individualJourney: jasmine.SpyObj<IndividualJourney>;
  let model: IndividualSuitabilityModel;

  beforeEach(() => {
    model = new MutableIndividualSuitabilityModel();
    mediaService = jasmine.createSpyObj<MediaService>(['requestAccess']);
    individualJourney = {
      model: model,
      ...jasmine.createSpyObj<IndividualJourney>(['goto'])
    } as jasmine.SpyObj<IndividualJourney>;
  });

  it(`should proceed to ${IndividualJourneySteps.HearingAsParticipant} after getting camera access`, fakeAsync(() => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: UseCameraMicrophoneComponent,
      declarations: [BackNavigationStubComponent],
      providers: [{ provide: MediaService, useValue: mediaService }],
      journey: individualJourney
    });
    fixture.detectChanges();
    const mediaAccessResponse = new MediaAccessResponse();
    mediaAccessResponse.exceptionType = '';
    mediaAccessResponse.result = true;
    mediaService.requestAccess.and.returnValue(Promise.resolve(mediaAccessResponse));

    const switchOnButton = fixture.debugElement.query(By.css('#switch-on-media'));
    switchOnButton.nativeElement.click();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.mediaAccepted.result).toBe(true);
    const continueButton = fixture.debugElement.query(By.css('#continue'));
    continueButton.nativeElement.click();

    expect(individualJourney.goto).toHaveBeenCalledWith(IndividualJourneySteps.HearingAsParticipant);
  }));

  it(`should proceed to ${IndividualJourneySteps.MediaAccessError} with access denied on failure`, async () => {

    const mediaAccessResponse = new MediaAccessResponse();
    mediaAccessResponse.exceptionType = 'NotAllowedError';
    mediaAccessResponse.result = false;
    mediaService.requestAccess.and.returnValue(Promise.resolve(mediaAccessResponse));
    const component = new UseCameraMicrophoneComponent(individualJourney, mediaService);
    await component.switchOnMedia();
    expect(individualJourney.goto).toHaveBeenCalledWith(IndividualJourneySteps.MediaAccessError);
    expect(model.mediaAccepted).toBe(false);
  });
});
