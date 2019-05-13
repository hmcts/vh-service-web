import { Injectable, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaService } from '../services/media.service';
import { IndividualBaseComponent } from '../pages/individual-base-component/individual-base.component';
import { IndividualJourney } from '../individual-journey';
import { UserCameraViewComponent } from '../components/user-camera-view/user-camera-view.component';

@Injectable()
export class HearingViewBaseComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  constructor(private userMediaService: MediaService, journey: IndividualJourney) {
    super(journey);
  }

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  stream: MediaStream;
  disabledReplay = true;

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(this.stream);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }
  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
