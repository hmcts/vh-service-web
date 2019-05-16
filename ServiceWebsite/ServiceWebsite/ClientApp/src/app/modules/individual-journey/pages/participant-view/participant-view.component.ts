import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { VideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css'],
})
export class ParticipantViewComponent extends VideoViewBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  stream: MediaStream;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    videoUrlService: VideoUrlService) {
    super(journey, videoUrlService, VideoFiles.BeforeTheDay_ParticipantView);
  }

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(this.stream);
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
