import { Component, ViewChild, OnInit, Injectable, AfterContentInit, OnDestroy, AfterViewInit, } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { IndividualBaseComponent } from '../../pages/individual-base-component/individual-base.component';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';


@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css'],
})
export class ParticipantViewComponent extends IndividualBaseComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild(VideoViewComponent)
  videoViewComponent: VideoViewComponent;

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  videoSource: string;
  stream: MediaStream;
  disabledReplay = true;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(journey);
  }

  ngOnInit() {
    this.videoSource = this.videoUrlService.getVideoFileUrl(VideoFiles.BeforeTheDay_ParticipantView);
  }

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(this.stream);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  replay() {
    this.videoViewComponent.play();
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
