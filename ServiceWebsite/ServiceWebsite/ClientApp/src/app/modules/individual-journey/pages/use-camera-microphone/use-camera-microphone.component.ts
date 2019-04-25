import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { MediaAccessService } from '../../services/media-access.service';

@Component({
  selector: 'app-use-camera-microphone',
  templateUrl: './use-camera-microphone.component.html',
  styles: []
})
export class UseCameraMicrophoneComponent extends IndividualBaseComponent {
  showTextDetails: boolean = false;
  mediaAccepted: boolean = false;
  constructor(private mediaAccess: MediaAccessService) {
    super();
  }
  switchOnMedia()
  {
    this.mediaAccess.requestAccess().then((data: any) => {
        this.mediaAccepted = data;
       if(!this.mediaAccepted )
      {
        
      }
    });
  }
}
