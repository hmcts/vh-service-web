import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: []
})
export class ParticipantViewComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent

  stream: MediaStream;
  widthVideo = 400;

  constructor(private userMediaService: UserMediaService) {
    super();
  }

  ngAfterContentInit() {
    this.userMediaService.getStream().then(s => {
      this.stream = s;
      this.userCameraViewComponent.setSource(s);
    });
  }

  continue(): void {
    // will contain code to proceed to next step
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
