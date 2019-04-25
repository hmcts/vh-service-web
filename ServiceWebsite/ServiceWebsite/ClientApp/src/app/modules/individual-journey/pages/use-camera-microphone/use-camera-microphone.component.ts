import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { MediaAccessService } from '../../services/media-access.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-use-camera-microphone',
  templateUrl: './use-camera-microphone.component.html',
  styles: []
})
export class UseCameraMicrophoneComponent extends IndividualBaseComponent {
   mediaAccepted: boolean = false;
  constructor(private mediaAccess: MediaAccessService) {
    super();
  }
  
  async switchOnMedia() {
    this.mediaAccepted = await this.mediaAccess.requestAccess();
    if (!this.mediaAccepted) {
      fail();
    }
  }
}
