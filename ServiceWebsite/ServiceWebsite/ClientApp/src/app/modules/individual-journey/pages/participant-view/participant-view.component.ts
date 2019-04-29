import { Component, ViewChild, AfterContentInit, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { BlobVideoStorageService } from '../../services/blob-video-storage.service';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: [],
  providers: [
    { provide: MediaService, useClass: UserMediaService },
    { provide: VideoUrlService, useClass: BlobVideoStorageService }
  ]
})
export class ParticipantViewComponent extends IndividualBaseComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  @ViewChild(AudioBarComponent)
  audioBarComponent: AudioBarComponent;

  @ViewChild(VideoViewComponent)
  videoViewComponent: VideoViewComponent;

  stream: MediaStream;
  widthVideo = 300;
  videoSource: string;
  disabledReplay = true;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(journey);
  }

  ngOnInit() {
    this.videoSource = this.videoUrlService.inHearingExampleVideo;
  }

  ngAfterContentInit() {
    this.userMediaService.getStream().then(s => {
      this.stream = s;
      this.userCameraViewComponent.setSource(s);
      this.audioBarComponent.setSource(s);
    });
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }

  replay() {
    this.videoViewComponent.play();
  }
}
