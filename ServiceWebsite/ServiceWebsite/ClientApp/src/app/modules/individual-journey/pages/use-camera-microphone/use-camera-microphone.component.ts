import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { MediaService } from '../../services/media.service';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-use-camera-microphone',
  templateUrl: './use-camera-microphone.component.html',
  styles: []
})
export class UseCameraMicrophoneComponent extends IndividualBaseComponent {
  mediaAccepted = false;
  constructor(journey: IndividualJourney, private mediaAccess: MediaService) {
    super(journey);
  }

  async switchOnMedia() {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted) {
      this.fail();
    }
  }
}
