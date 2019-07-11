import {Component, OnInit} from '@angular/core';
import {JourneyBase} from '../../../base-journey/journey-base';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { MediaService } from 'src/app/modules/individual-journey/services/media.service';
import { ParticipantSuitabilityModel } from 'src/app/modules/base-journey/participant-suitability.model';

@Component({
  selector: 'app-switch-on-camera-and-microphone',
  templateUrl: './switch-on-camera-and-microphone.component.html',
  styles: []
})
export class SwitchOnCameraAndMicrophoneComponent implements OnInit {

  constructor(private journey: JourneyBase, private mediaAccess: MediaService, private model: ParticipantSuitabilityModel) {

  }

  ngOnInit(): void {
  }

  switchOnCameraAndMicrophone(): Promise<void> {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted) {
      this.model.mediaAccepted = false;
      this.journey.goto(IndividualJourneySteps.MediaAccessError);
    }
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
  }
}
