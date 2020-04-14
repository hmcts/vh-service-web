import { Component, OnInit, OnDestroy } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel, MediaAccessResponse } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { TokenResponse, ParticipantResponse } from '../../../../services/clients/api-client';
import { UserMediaStreamService } from '../../services/user-media-stream.service';
import { VideoWebService } from '../../services/video-web.service';
import { ConfigService } from '../../../../services/config.service';
import { Logger } from '../../../../services/logger';
import { Subscription } from 'rxjs';
import { UserMediaService } from '../../../../services/user-media.service';
import { SelectedUserMediaDevice } from '../../../shared/models/selected-user-media-device';

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

    $subcriptions: Subscription[] = [];

    mediaSwitchedOn: MediaAccessResponse;
    NotAllowedError = 'NotAllowedError';

    constructor(
        journey: JourneyBase,
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
        try {
            await this.setupPexipClient();
            this.logger.event('telemetry:serviceweb:any:selftest:start');
        } catch (error) {
            if (error.toString().includes(this.NotAllowedError)) {
                this.showEquipmentBlockedMessage();
                return;
            }
        }
        await this.getToken();
    }

    setupSubscribers() {
        this.$subcriptions.push(
            this.userMediaService.connectedDevices.subscribe(async () => {
                this.hasMultipleDevices = await this.userMediaService.hasMultipleDevices();

                this.logger.event(`(setupSubscribers) Has multiple devices: ${this.hasMultipleDevices}`, {
                    hearingId: this.model.hearing.id,
                    participantId: this.model.participantId
                });
            })
        );
    }

    async setConfiguration() {
        const config = await this.configService.load();
        this.pexipNode = config.pexipSelfTestNodeUri;
    }

    async getToken() {
        this.logger.event('(getToken -> About to get token for pexip.)', {
            hearingId: this.model.hearing.id,
            participantId: this.model.participantId
        });

        const response = await this.videoWebService.getCurrentParticipantId().toPromise<ParticipantResponse>();
        this.participantId = response.id;
        try {
            const token = await this.videoWebService.getToken(this.participantId).toPromise<TokenResponse>();
            this.token = token;
            this.call();
        } catch (error) {
            this.loadingData = false;
            this.logger.error('(getToken -> Error to get token.)', new Error(error), {
                hearingId: this.model.hearing.id,
                participantId: this.model.participantId
            });
        }
    }

    call() {
        this.didTestComplete = false;
        this.testScore = null;
        const conferenceAlias = 'testcall2';
        const tokenOptions = btoa(`${this.token.expires_on};${this.participantId};${this.token.token}`);
        if (this.pexipAPI) {
            this.logger.event('(call -> About to make pexip call.)', {
                hearingId: this.model.hearing.id,
                participantId: this.model.participantId,
                conferenceAlias: conferenceAlias
            });
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

            this.logger.event('(updatePexipAudioVideoSource -> Assigning Video Source.)', {
                hearingId: this.model.hearing.id,
                participantId: this.model.participantId
            });
        }

        const mic = this.userMediaService.getPreferredMicrophone();
        if (mic) {
            this.pexipAPI.audio_source = mic.deviceId;

            this.logger.event('(updatePexipAudioVideoSource -> Assigning Audio Source.)', {
                hearingId: this.model.hearing.id,
                participantId: this.model.participantId
            });
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

            this.pexipAPI.onConnect = (stream) => {
                self.connectHandleEvent(stream);
            };

            this.pexipAPI.onError = (reason) => {
                self.errorHandleEvent(reason);
            };

            this.pexipAPI.onDisconnect = (reason) => {
                this.logger.event('(setupPexipClient -> pexipAPI.onDisconnect)', {
                    hearingId: this.model.hearing.id,
                    participantId: this.model.participantId
                });

                self.disconnectHandleEvent(reason);
            };
        }
    }

    connectHandleEvent(stream) {
        this.logger.event('(connectHandleEvent) successfully connected', {
            hearingId: this.model.hearing.id,
            participantId: this.model.participantId
        });

        this.incomingStream = stream;
        this.displayFeed = true;
    }

    errorHandleEvent(reason) {
        this.displayFeed = false;
        this.logger.error('(setupPexipClient -> pexipAPI.onError)', new Error(reason), {
            hearingId: this.model.hearing.id,
            participantId: this.model.participantId
        });

        this.didTestComplete = true;
        if (reason.toString().includes('Could not get access to camera/microphone')) {
            this.showEquipmentBlockedMessage();
        }
    }

    disconnectHandleEvent(reason) {
        this.displayFeed = false;

        if (reason === 'Conference terminated by another participant') {
            this.didTestComplete = true;
            this.retrieveSelfTestScore();
            return;
        }

        this.logger.error('(disconnectHandleEvent -> Disconnected from pexip.)', new Error(reason), {
            hearingId: this.model.hearing.id,
            participantId: this.model.participantId
        });
    }

    disconnect() {
        if (this.pexipAPI) {
            this.logger.event('(disconnect -> About to disconnecting from pexip.)', {
                hearingId: this.model.hearing.id,
                participantId: this.model.participantId
            });

            this.pexipAPI.disconnect();
        }
        this.closeStreams();
        this.incomingStream = null;
        this.outgoingStream = null;
        this.didTestComplete = true;
        this.displayFeed = false;
    }

    closeStreams() {
        if (this.preferredMicrophoneStream) {
            this.userMediaStreamService.stopStream(this.preferredMicrophoneStream);
        }
        this.preferredMicrophoneStream = null;
    }

    retrieveSelfTestScore() {
        this.model.selfTest.selfTestResultScore = 'None';
        this.$subcriptions.push(
            this.videoWebService.getTestCallScore(this.participantId).subscribe(
                (score) => {
                    this.logger.event(`(retrieveSelfTestScore -> TEST SCORE KINLY RESULT: ${score.score})`, {
                        hearingId: this.model.hearing.id,
                        participantId: this.model.participantId
                    });

                    this.logger.event(`telemetry:serviceweb:any:selftest:score:${score.score}`);

                    this.model.selfTest.selfTestResultScore = score.score;
                },
                (error) => {
                    this.model.selfTest.selfTestResultScore = 'None';

                    this.logger.error('(retrieveSelfTestScore -> Error to get self test score)', new Error(error), {
                        hearingId: this.model.hearing.id,
                        participantId: this.model.participantId
                    });
                    this.logger.event('telemetry:serviceweb:any:selftest:score:none');
                }
            )
        );
    }

    protected bindModel(): void {}

    async replayVideo() {
        this.logger.event('(replayVideo -> Replaying Video.)', {
            hearingId: this.model.hearing.id,
            participantId: this.model.participantId
        });

        this.disconnect();
        this.dispose();
        try {
            await this.setupPexipClient();
            this.didTestComplete = true;
        } catch (error) {
            if (error.toString().includes(this.NotAllowedError)) {
                this.showEquipmentBlockedMessage();
                return;
            }

            throw error;
        }

        this.mediaSwitchedOn = await this.userMediaService.requestAccess();
        if (!this.mediaSwitchedOn.result && this.mediaSwitchedOn.exceptionType === this.NotAllowedError) {
            this.showEquipmentBlockedMessage();
        } else {
            this.call();
        }
    }

    showEquipmentBlockedMessage() {
        this.model.mediaSwitchedOn = false;
        this.journey.goto(SelfTestJourneySteps.EquipmentBlocked);
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
        this.logger.event('telemetry:serviceweb:any:selftest:complete');
        this.journey.goto(SelfTestJourneySteps.CameraWorking);
    }

    dispose() {
        if (this.pexipAPI) {
            this.pexipAPI.disconnect();
        }
        this.pexipAPI = null;
        this.userMediaStreamService.stopStream(this.incomingStream);
        this.userMediaStreamService.stopStream(this.outgoingStream);
        this.userMediaStreamService.stopStream(this.preferredMicrophoneStream);

        this.incomingStream = null;
        this.outgoingStream = null;
    }

    ngOnDestroy() {
        this.disconnect();
        this.dispose();
        this.$subcriptions.forEach((subcription) => {
            if (subcription) {
                subcription.unsubscribe();
            }
        });
    }
}
