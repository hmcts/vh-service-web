import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { TokenResponse } from '../../../../services/clients/api-client';
import { UserMediaService } from '../../services/user-media.service';
import { UserMediaStreamService } from '../../services/user-media-stream.service';
import { VideoWebService } from '../../services/video-web-service';
import { ConfigService } from '../../../../services/config.service';
import { Logger } from '../../../../services/logger';
import { UserMediaDevice } from '../../models/user-media-device';

declare var PexRTC: any;

@Component({
  selector: 'app-test-your-equipment',
  templateUrl: './test-your-equipment.component.html',
  styles: []
})
export class TestYourEquipmentComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {
  token: TokenResponse;
  pexipAPI: any;
  hasMultipleDevices: boolean;
  participantId = 'b4e1c447-0e97-4bfd-b1d8-006dd28d8428';

  incomingStream: MediaStream;
  outgoingStream: MediaStream;
  preferredMicrophoneStream: MediaStream;

  testComplete = false;
  testScore: string;
  displayFeed: boolean;
  loadingData: boolean;

  constructor(journey: JourneyBase,
    private model: ParticipantSuitabilityModel,
    private userMediaService: UserMediaService,
    private userMediaStreamService: UserMediaStreamService,
    private videoWebService: VideoWebService,
    private configService: ConfigService,
    private logger: Logger
  ) {
    super(journey);
  }

  ngOnInit(): void {
    this.displayFeed = false;
    this.setupSubscribers();
    this.setupPexipClient();
    this.getToken();
  }

  setupSubscribers() {
    this.userMediaService.connectedDevices.subscribe(async (devices) => {
      this.hasMultipleDevices = await this.userMediaService.hasMultipleDevices();
      console.log('Has devices :' + this.hasMultipleDevices);
    });
  }

  getToken() {
    this.participantId = 'b4e1c447-0e97-4bfd-b1d8-006dd28d8428';
    this.videoWebService.getToken(this.participantId).subscribe((token: TokenResponse) => {
      this.token = token;
      this.call();
    },
      (error) => {
        this.loadingData = false;
        this.logger.error('Error to get token.', error);
      });
  }

  async call() {
    this.testComplete = false;
    this.testScore = null;
    const config = await this.configService.load();
    const pexipNode = config.pexipSelfTestNodeUri;
    const conferenceAlias = 'testcall2';
    const tokenOptions = btoa(`${this.token.expires_on};${this.participantId};${this.token.token}`);
    this.pexipAPI.makeCall(pexipNode, `${conferenceAlias};${tokenOptions}`, this.participantId, null);
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

  setupPexipClient() {
    const self = this;
    this.pexipAPI = new PexRTC();
    this.updatePexipAudioVideoSource();
    this.pexipAPI.onSetup = function (stream, pin_status, conference_extension) {
      self.outgoingStream = stream;
      this.connect('0000', null);
    };

    this.pexipAPI.onConnect = function (stream) {
      console.log('successfully connected');
      self.incomingStream = stream;
      self.displayFeed = true;
    };

    this.pexipAPI.onError = function (reason) {
      self.displayFeed = false;
      console.log('Error from pexip. Reason : ' + reason);
      self.logger.error('Error from pexip.', reason);
    };

    this.pexipAPI.onDisconnect = function (reason) {
      self.displayFeed = false;
      console.log('Disconnected from pexip. Reason : ' + reason);
      self.logger.error('Disconnected from pexip.', reason);
    };
  }

  disconnect() {
    if (this.pexipAPI) {
      this.pexipAPI.disconnect();
    }
    this.incomingStream = null;
    this.outgoingStream = null;
    this.testComplete = true;
  }

  protected bindModel(): void {
  }

  replayVideo() {
    this.pexipAPI.disconnect();
    this.call();
  }

  continue() {
    if (!this.testComplete) {
      this.disconnect();
    }
    this.journey.goto(SelfTestJourneySteps.CameraWorking);
  }
}
