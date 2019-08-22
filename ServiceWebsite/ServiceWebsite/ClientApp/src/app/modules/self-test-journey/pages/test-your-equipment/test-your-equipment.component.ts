import {Component, OnInit, OnDestroy} from '@angular/core';
import {SuitabilityChoicePageBaseComponent} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';
import {SelfTestJourneySteps} from '../../self-test-journey-steps';
import {TokenResponse, ParticipantResponse} from '../../../../services/clients/api-client';
import {UserMediaStreamService} from '../../services/user-media-stream.service';
import {VideoWebService} from '../../services/video-web.service';
import {ConfigService} from '../../../../services/config.service';
import {Logger} from '../../../../services/logger';
import {Subscription} from 'rxjs';
import {UserMediaService} from '../../../../services/user-media.service';
import {SelectedUserMediaDevice} from '../../../shared/models/selected-user-media-device';

declare var PexRTC: any;

@Component({
  selector: 'app-test-your-equipment',
  templateUrl: './test-your-equipment.component.html',
  styles: []
})
export class TestYourEquipmentComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit, OnDestroy {

  token: TokenResponse;
  pexipAPI: any;
  displayDeviceChangeModal: boolean;
  hasMultipleDevices: boolean;
  participantId: string;
  pexipNode: string;

  incomingStream: MediaStream;
  outgoingStream: MediaStream;
  preferredMicrophoneStream: MediaStream;

  didTestComplete: boolean;
  testScore: string;
  displayFeed: boolean;
  loadingData: boolean;
  userMediaService: UserMediaService;
  logger: Logger;

  subDevice: Subscription;
  subScore: Subscription;

  constructor(journey: JourneyBase,
              private model: ParticipantSuitabilityModel,
              _userMediaService: UserMediaService,
              private userMediaStreamService: UserMediaStreamService,
              private videoWebService: VideoWebService,
              private configService: ConfigService,
              _logger: Logger
  ) {
    super(journey);
    this.didTestComplete = false;
    this.userMediaService = _userMediaService;
    this.logger = _logger;
  }

  async ngOnInit(): Promise<void> {
    this.displayFeed = false;
    this.displayDeviceChangeModal = false;
    this.setupSubscribers();
    await this.setConfiguration();
    await this.setupPexipClient();
    await this.getToken();
  }

  setupSubscribers() {
    this.subDevice = this.userMediaService.connectedDevices.subscribe(async () => {
      this.hasMultipleDevices = await this.userMediaService.hasMultipleDevices();
      console.log('Has devices :' + this.hasMultipleDevices);
    });
  }

  async setConfiguration() {
    const config = await this.configService.load();
    this.pexipNode = config.pexipSelfTestNodeUri;
  }

  async getToken() {
    this.videoWebService.getCurrentParticipantId().subscribe((response: ParticipantResponse) => {
      this.participantId = response.id;
      this.videoWebService.getToken(this.participantId).subscribe(async (token: TokenResponse) => {
          this.token = token;
          this.call();
        },
        (error) => {
          this.loadingData = false;
          this.logger.error('Error to get token.', error);
        });
    });
  }

  call() {
    this.didTestComplete = false;
    this.testScore = null;
    const conferenceAlias = 'testcall1';
    const tokenOptions = btoa(`${this.token.expires_on};${this.participantId};${this.token.token}`);
    if (this.pexipAPI) {
      this.pexipAPI.makeCall(this.pexipNode, `${conferenceAlias};${tokenOptions}`, this.participantId, null);
    }
  }

  get streamsActive() {
    return this.outgoingStream && this.outgoingStream.active && this.incomingStream && this.incomingStream.active;
  }

  async updatePexipAudioVideoSource() {
    this.hasMultipleDevices = await this.userMediaService.hasMultipleDevices();
    const cam = this.userMediaService.getPreferredCamera();
    if (cam) {
      this.pexipAPI.video_source = cam.deviceId;
    }

    const mic = this.userMediaService.getPreferredMicrophone();
    if (mic) {
      this.pexipAPI.audio_source = mic.deviceId;
    }
    this.preferredMicrophoneStream = await this.userMediaStreamService.getStreamForMic(mic);
  }

  async setupPexipClient() {
    const self = this;
    this.pexipAPI = new PexRTC();

    if (this.pexipAPI) {
      await this.updatePexipAudioVideoSource();

      this.pexipAPI.onSetup = function (stream) {
        self.outgoingStream = stream;
        this.connect('0000', null);
      };

      this.pexipAPI.onConnect = ((stream) => {
        self.connectHandleEvent(stream);
      });

      this.pexipAPI.onError = ((reason) => {
        self.errorHandleEvent(reason);
      });

      this.pexipAPI.onDisconnect = ((reason) => {
        self.disconnectHandleEvent(reason);
      });
    }
  }

  connectHandleEvent(stream) {
    console.log('successfully connected');
    this.incomingStream = stream;
    this.displayFeed = true;
  }

  errorHandleEvent(reason) {
    this.displayFeed = false;
    console.log('Error from pexip. Reason : ' + reason);
    this.logger.error('Error from pexip.', reason);
    this.didTestComplete = true;
  }

  disconnectHandleEvent(reason) {
    this.displayFeed = false;
    console.log('Disconnected from pexip. Reason : ' + reason);
    this.logger.error('Disconnected from pexip.', reason);
    if (reason === 'Conference terminated by another participant') {
      this.didTestComplete = true;
      this.retrieveSelfTestScore();
    }
  }

  disconnect() {
    if (this.pexipAPI) {
      this.pexipAPI.disconnect();
    }

    this.incomingStream = null;
    this.outgoingStream = null;
    this.didTestComplete = true;
    this.displayFeed = false;
  }

  retrieveSelfTestScore() {
    this.subScore = this.videoWebService.getTestCallScore(this.participantId).subscribe((score) => {
      console.log('TEST SCORE KINLY RESULT:' + score.score);
      this.model.selfTest.selfTestResultScore = score.score;
    }, (error) => {
      this.model.selfTest.selfTestResultScore = 'None';
      this.logger.error('Error to get self test score: ', error);
    });
  }

  protected bindModel(): void {
  }

  async replayVideo() {
    this.dispose();

    await this.setupPexipClient();
    await this.userMediaService.requestAccess();
    this.call();
  }

  async changeDevices() {
    this.disconnect();
    this.displayDeviceChangeModal = true;
  }

  async onMediaDeviceChangeAccepted(selectedMediaDevice: SelectedUserMediaDevice) {
    this.displayDeviceChangeModal = false;
    this.userMediaService.updatePreferredCamera(selectedMediaDevice.selectedCamera);
    this.userMediaService.updatePreferredMicrophone(selectedMediaDevice.selectedMicrophone);
    await this.updatePexipAudioVideoSource();
    this.call();
  }

  async onMediaDeviceChangeCancelled() {
    this.displayDeviceChangeModal = false;
    this.call();
  }

  continue() {
    if (!this.didTestComplete) {
      this.disconnect();
    }
    this.pexipAPI = null;
    this.retrieveSelfTestScore();
    this.journey.goto(SelfTestJourneySteps.CameraWorking);
  }

  dispose() {
    if (this.pexipAPI) {
      this.pexipAPI.disconnect();
    }
    this.pexipAPI = null;
    this.userMediaStreamService.stopStream(this.incomingStream);
    this.userMediaStreamService.stopStream(this.outgoingStream);
    this.incomingStream = null;
    this.outgoingStream = null;
  }

  ngOnDestroy() {
    this.dispose();
  }
}
