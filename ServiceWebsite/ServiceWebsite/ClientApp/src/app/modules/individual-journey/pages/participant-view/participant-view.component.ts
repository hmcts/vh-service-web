import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { VideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component';
import { DeviceType } from '../../services/device-type';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css'],
})
export class ParticipantViewComponent extends VideoViewBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  stream: MediaStream;
  isMobile = false;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    videoUrlService: VideoUrlService, private deviceType: DeviceType) {
    super(journey, videoUrlService, VideoFiles.BeforeTheDay_ParticipantView);
    this.isMobile = this.deviceType.isMobile();
  }

  async ngAfterContentInit() {
    if (!this.isMobile) {
      this.stream = await this.userMediaService.getStream();
      this.userCameraViewComponent.setSource(this.stream);
    }
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
