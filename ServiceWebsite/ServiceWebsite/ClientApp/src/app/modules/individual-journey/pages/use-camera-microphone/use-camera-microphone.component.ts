import { IndividualJourneySteps } from './../../individual-journey-steps';
import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from 'src/app/services/media.service';
import { MediaAccessResponse } from 'src/app/modules/base-journey/participant-suitability.model';

@Component({
  selector: 'app-use-camera-microphone',
  templateUrl: './use-camera-microphone.component.html',
  styles: []
})
export class UseCameraMicrophoneComponent {
  mediaAccepted: MediaAccessResponse;
  constructor(private journey: IndividualJourney, private mediaAccess: MediaService) {
  }

  async switchOnMedia(): Promise<void> {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted.result && this.mediaAccepted.exceptionType === 'NotAllowedError') {
      this.journey.model.mediaAccepted = false;
      this.journey.goto(IndividualJourneySteps.MediaAccessError);
    }
  }

  continue() {
    this.journey.goto(IndividualJourneySteps.HearingAsParticipant);
  }
}
