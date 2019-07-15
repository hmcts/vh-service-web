import {Component, OnInit} from '@angular/core';
import {JourneyBase} from '../../../base-journey/journey-base';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { ParticipantSuitabilityModel } from 'src/app/modules/base-journey/participant-suitability.model';
import { MediaService } from 'src/app/services/media.service';
import { ParticipantJourneySteps } from 'src/app/modules/base-journey/participant-journey-steps';

@Component({
  selector: 'app-switch-on-camera-and-microphone',
  templateUrl: './switch-on-camera-and-microphone.component.html',
  styles: []
})
export class SwitchOnCameraAndMicrophoneComponent implements OnInit {
  mediaAccepted = false;
  constructor(private journey: JourneyBase, private mediaAccess: MediaService, private model: ParticipantSuitabilityModel) {
  }

  ngOnInit(): void {
  }

  async switchOnCameraAndMicrophone(): Promise<void> {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted) {
      this.model.mediaAccepted = false;
      this.journey.goto(ParticipantJourneySteps.MediaAccessError);
    }
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
  }
}
