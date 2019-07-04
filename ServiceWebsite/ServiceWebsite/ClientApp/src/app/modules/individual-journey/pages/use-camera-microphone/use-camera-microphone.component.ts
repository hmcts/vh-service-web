import { IndividualJourneySteps } from './../../individual-journey-steps';
import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-use-camera-microphone',
  templateUrl: './use-camera-microphone.component.html',
  styles: []
})
export class UseCameraMicrophoneComponent {
  mediaAccepted = false;
  constructor(private journey: IndividualJourney, private mediaAccess: MediaService) {
  }

  async switchOnMedia(): Promise<void> {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted) {
      this.journey.model.mediaAccepted = false;
      this.journey.goto(IndividualJourneySteps.MediaAccessError);
    }
  }

  continue() {
    this.journey.goto(IndividualJourneySteps.HearingAsParticipant);
  }
}
