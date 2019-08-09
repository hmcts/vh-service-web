import {JourneyBase} from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {CrestBluePanelComponent} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {TestYourEquipmentComponent} from './test-your-equipment.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {SelfTestJourneySteps} from '../../self-test-journey-steps';
import {MockLogger} from '../../../../testing/mocks/mock-logger';
import {Logger} from '../../../../services/logger';
import {VideoWebService} from '../../services/video-web.service';
import {of, throwError} from 'rxjs';
import {Component, Input} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {TokenResponse, ParticipantResponse} from '../../../../services/clients/api-client';
import {Config} from '../../../shared/models/config';
import {UserMediaStreamService} from '../../services/user-media-stream.service';
import {MutableIndividualSuitabilityModel} from '../../../individual-journey/mutable-individual-suitability.model';
import {SelfTestAnswers} from '../../../base-journey/participant-suitability.model';
import {UserMediaService} from '../../../../services/user-media.service';
import {UserMediaDevice} from '../../../shared/models/user-media-device';
import {SelectedUserMediaDevice} from '../../../shared/models/selected-user-media-device';

@Component({
  selector: 'app-mic-visualiser',
  template: ''
})
class StubMicVisualiserComponent {
  @Input() stream: MediaStream;
}

@Component({
  selector: 'app-select-media-devices',
  template: ''
})
class StubSelectedUserMediaDeviceComponent {
  @Input() selectedCamera: UserMediaDevice;
  @Input() selectedMicrophone: UserMediaDevice;
}

const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
const videoWebServiceMock = jasmine.createSpyObj<VideoWebService>(['getToken', 'getCurrentParticipantId', 'getTestCallScore']);
videoWebServiceMock.getToken.and.returnValue(of(new TokenResponse()));
videoWebServiceMock.getCurrentParticipantId.and.returnValue(of(new ParticipantResponse()));

const configServiceMock = jasmine.createSpyObj<ConfigService>(['load']);
configServiceMock.load.and.returnValue(of(new Config()));

const userMediaStreamServiceMock = jasmine.createSpyObj<UserMediaStreamService>(['getStreamForMic', 'stopStream']);
userMediaStreamServiceMock.getStreamForMic.and.returnValue(Promise.resolve(new MediaStream()));

describe('TestYourEquipmentComponent', () => {
  it('can continue', () => {
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: TestYourEquipmentComponent,
      journey: journey,
      declarations: [CrestBluePanelComponent, StubMicVisualiserComponent, StubSelectedUserMediaDeviceComponent],
      providers: [{provide: Logger, useClass: MockLogger},
        {provide: VideoWebService, useValue: videoWebServiceMock},
        {provide: UserMediaStreamService, useValue: userMediaStreamServiceMock},
        {provide: ConfigService, useValue: configServiceMock},
        UserMediaService
      ],
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CameraWorking);
  });
});

describe('TestYourEquipmentComponent functionality', () => {
  let journeyObj: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;
  let component: TestYourEquipmentComponent;
  videoWebServiceMock.getTestCallScore.and.returnValue(of('Okay'));

  beforeEach(() => {
    journeyObj = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
    component = new TestYourEquipmentComponent(journeyObj, model,
      new UserMediaService(new MockLogger()), userMediaStreamServiceMock, videoWebServiceMock,
      configServiceMock, new MockLogger());
  });

  it('should setup pexip client', async () => {
    component.token = new TokenResponse({expires_on: '06/07/22', token: '4556'});
    const defaultDevice = new UserMediaDevice('fake_device_0', 'default', 'videoinput', 'group1');
    const soundOutput = new UserMediaDevice('Fake Audio Input 1', 'audiooutput1', 'audiooutput', 'group1');

    component.userMediaService.updatePreferredCamera(defaultDevice);
    component.userMediaService.updatePreferredMicrophone(soundOutput);
    await component.ngOnInit();
    expect(component.didTestComplete).toBeFalsy();
  });

  it('should update video and audio devices', async () => {
    const defaultDevice = new UserMediaDevice('fake_device_0', 'default', 'videoinput', 'group1');
    const soundOutput = new UserMediaDevice('Fake Audio Input 1', 'audiooutput1', 'audiooutput', 'group1');


    component.userMediaService.updatePreferredCamera(defaultDevice);
    component.userMediaService.updatePreferredMicrophone(soundOutput);
    await component.ngOnInit();
    await component.updatePexipAudioVideoSource();
    expect(component.pexipAPI.audio_source).toBeTruthy();
  });

  it('should pexip make a call', async () => {
    component.token = new TokenResponse({expires_on: '06/07/22', token: '4556'});
    component.call();
    expect(component.didTestComplete).toBeFalsy();
  });

  it('should replay video', async () => {
    component.token = new TokenResponse({expires_on: '06/07/22', token: '4556'});
    component.didTestComplete = true;
    await component.ngOnInit();
    await component.replayVideo();
    expect(component.didTestComplete).toBeFalsy();
  });

  it('should disconnect pexip', async () => {
    component.disconnect();
    expect(component.didTestComplete).toBeTruthy();
    expect(component.displayFeed).toBeFalsy();
  });

  it('should connected handle set incoming stream', () => {
    component.connectHandleEvent(new MediaStream());
    expect(component.incomingStream).toBeTruthy();
    expect(component.displayFeed).toBeTruthy();
  });

  it('should disconnected handle set test to completed and retrieve test score', () => {
    component.disconnectHandleEvent('Conference terminated by another participant');
    expect(component.didTestComplete).toBeTruthy();
    expect(component.displayFeed).toBeFalsy();
    expect(videoWebServiceMock.getTestCallScore).toHaveBeenCalled();
  });

  it('should error handle set test to completed', () => {
    component.errorHandleEvent('Error');
    expect(component.didTestComplete).toBeTruthy();
    expect(component.displayFeed).toBeFalsy();
  });

  it('should check for active streams', async () => {
    expect(component.streamsActive).toBeFalsy();
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(function (stream) {
        component.outgoingStream = stream;
        component.incomingStream = stream;
        expect(component.streamsActive).toBeTruthy();
      });
  });

  it('should retrieve test score', async () => {
    component.participantId = '27467';
    await component.retrieveSelfTestScore();
    expect(videoWebServiceMock.getTestCallScore).toHaveBeenCalled();
  });

  it('should stop all stream on destroy event', async () => {
    component.ngOnDestroy();
    expect(component.incomingStream).toBeNull();
    expect(component.outgoingStream).toBeNull();
    expect(component.pexipAPI).toBeNull();
  });

  it('should changeDevices', async () => {
    component.displayDeviceChangeModal = false;
    await component.changeDevices();
    expect(component.displayDeviceChangeModal).toBeTruthy();
  });

  it('should replayVideo', async () => {
    component.token = new TokenResponse({expires_on: '06/07/22', token: '4556'});
    component.didTestComplete = true;
    await component.replayVideo();
    expect(component.didTestComplete).toBeFalsy();
  });
});

describe('TestYourEquipmentComponent error functionality', () => {
  let journeyObj: jasmine.SpyObj<JourneyBase>;
  let model: MutableIndividualSuitabilityModel;
  let component: TestYourEquipmentComponent;
  videoWebServiceMock.getTestCallScore.and.returnValue(throwError('error'));

  beforeEach(() => {
    journeyObj = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    model = new MutableIndividualSuitabilityModel();
    model.selfTest = new SelfTestAnswers();
    component = new TestYourEquipmentComponent(journeyObj, model,
      new UserMediaService(new MockLogger()), userMediaStreamServiceMock, videoWebServiceMock,
      configServiceMock, new MockLogger());
  });

  it('should retrieve test score and get error', async () => {
    component.participantId = '27467';
    spyOn(component.logger, 'error');
    await component.retrieveSelfTestScore();
    expect(videoWebServiceMock.getTestCallScore).toHaveBeenCalled();
    expect(component.logger.error).toHaveBeenCalled();
  });
});
