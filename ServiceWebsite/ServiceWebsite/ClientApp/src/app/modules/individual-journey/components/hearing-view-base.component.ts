import { Injectable, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaService } from '../services/media.service';
import { IndividualBaseComponent } from '../pages/individual-base-component/individual-base.component';
import { IndividualJourney } from '../individual-journey';
import { UserCameraViewComponent } from '../components/user-camera-view/user-camera-view.component';
import { AudioBarComponent } from '../components/audio-bar/audio-bar.component';

@Injectable()
export class HearingViewBaseComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  constructor(private userMediaService: MediaService, journey: IndividualJourney) {
    super(journey);
  }

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  @ViewChild(AudioBarComponent)
  audioBarComponent: AudioBarComponent;

  stream: MediaStream;
  disabledReplay = true;

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(this.stream);
    this.audioBarComponent.setSource(this.stream);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }
  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
