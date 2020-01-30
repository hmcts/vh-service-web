import { Component, OnInit } from '@angular/core';
import { JourneyBase } from '../../../base-journey/journey-base';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { ParticipantSuitabilityModel, MediaAccessResponse } from 'src/app/modules/base-journey/participant-suitability.model';
import { MediaService } from 'src/app/services/media.service';
import {Logger} from '../../../../services/logger';


@Component({
  selector: 'app-switch-on-camera-and-microphone',
  templateUrl: './switch-on-camera-and-microphone.component.html',
  styles: []
})
export class SwitchOnCameraAndMicrophoneComponent implements OnInit {
  mediaSwitchedOn: MediaAccessResponse;
  isRepresentative: boolean;
  isIndividual: boolean;
  constructor(private journey: JourneyBase,
              private mediaAccess: MediaService,
              private model: ParticipantSuitabilityModel,
              private logger: Logger) {
    this.isRepresentative = false;
    this.isIndividual = false;
  }

  ngOnInit(): void {
    this.isRepresentative = this.journey.constructor.name === 'RepresentativeJourney';
    this.isIndividual = this.journey.constructor.name === 'IndividualJourney';
  }

  async switchOnCameraAndMicrophone(): Promise<void> {
    this.logger.event(`(switchOnCameraAndMicrophone) Switching on Camera and Microphone`,
      {hearingId: this.model.hearing.id, participantId: this.model.participantId});

      this.mediaSwitchedOn = await this.mediaAccess.requestAccess();

    if (!this.mediaSwitchedOn.result && (this.mediaSwitchedOn.exceptionType === 'NotAllowedError'
      || this.mediaSwitchedOn.exceptionType === 'NotFoundError')) {
      this.logger.event(`(switchOnCameraAndMicrophone) Unable to get access to Camera and Microphone`,
        {hearingId: this.model.hearing.id, participantId: this.model.participantId, error: this.mediaSwitchedOn.exceptionType });

      this.model.mediaSwitchedOn = false;
      this.journey.goto(SelfTestJourneySteps.EquipmentBlocked);
    }
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
  }
}
