import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { SelfTestJourneyComponentTestBed } from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import { ContinuableComponentFixture } from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { SwitchOnCameraAndMicrophoneComponent } from './switch-on-camera-and-microphone.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MediaService } from 'src/app/services/media.service';
import {Hearing, SelfTestAnswers, MediaAccessResponse } from 'src/app/modules/base-journey/participant-suitability.model';
import { By } from '@angular/platform-browser';
import { tick, fakeAsync } from '@angular/core/testing';
import {MockLogger} from '../../../../testing/mocks/mock-logger';
import {Logger} from '../../../../services/logger';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';

describe('SwitchOnCameraAndMicrophoneComponent', () => {

  let journey: jasmine.SpyObj<JourneyBase>;
  let model: ParticipantSuitabilityModel;
  let mediaService: jasmine.SpyObj<MediaService>;

  beforeEach(() => {
    model = new ParticipantSuitabilityModel();
    model.hearing = new Hearing('1');
    model.participantId = '2';
    model.selfTest = new SelfTestAnswers();
    mediaService = jasmine.createSpyObj<MediaService>(['requestAccess']);
    journey = {
      model: model,
      ...jasmine.createSpyObj<JourneyBase>(['goto'])
    } as jasmine.SpyObj<JourneyBase>;
  });

  it(`goes to ${SelfTestJourneySteps.TestYourEquipment} on continuing`, fakeAsync(() => {

    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SwitchOnCameraAndMicrophoneComponent,
      providers: [{ provide: MediaService, useValue: mediaService }, {provide: Logger, useClass: MockLogger}],
      declarations: [CrestBluePanelComponent, BackNavigationStubComponent],
      journey: journey,
      model: model
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

    expect(fixture.componentInstance.mediaSwitchedOn.result).toBe(true);
    const continueButton = fixture.debugElement.query(By.css('#continue'));
    continueButton.nativeElement.click();

    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.TestYourEquipment);
    mediaService.requestAccess.and.returnValue(Promise.resolve(true));
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.TestYourEquipment);
  }));

  it(`should proceed to ${SelfTestJourneySteps.EquipmentBlocked} with access denied on failure`, async () => {
    const mediaAccessResponse = new MediaAccessResponse();
    mediaAccessResponse.exceptionType = 'NotAllowedError';
    mediaAccessResponse.result = false;
    mediaService.requestAccess.and.returnValue(Promise.resolve(mediaAccessResponse));
    const component = new SwitchOnCameraAndMicrophoneComponent(journey, mediaService, model, new MockLogger());
    await component.switchOnCameraAndMicrophone();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.EquipmentBlocked);
    expect(model.mediaSwitchedOn).toBe(false);
  });
});
