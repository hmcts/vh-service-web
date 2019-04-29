import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: []
})
export class ParticipantViewComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  @ViewChild(AudioBarComponent)
  audioBarComponent: AudioBarComponent;

  stream: MediaStream;
  widthVideo = 300;

  constructor(journey: IndividualJourney, private userMediaService: MediaService) {
    super(journey);
  }

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(this.stream);
    this.audioBarComponent.setSource(this.stream);
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }

  replay() {
  }
}
