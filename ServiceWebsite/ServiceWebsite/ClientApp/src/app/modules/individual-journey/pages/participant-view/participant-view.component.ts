import { Component, ViewChild, AfterContentInit, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoFiles } from '../../services/video-files';
import { BlobVideoStorageService } from '../../services/blob-video-storage.service';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: [],
  providers: [{ provide: MediaService, useClass: UserMediaService }]
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

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    private blobStorageService: BlobVideoStorageService) {
    super(journey);
  }

  ngOnInit() {
    this.videoSource = this.blobStorageService.getVideoUrl(VideoFiles.BeforeTheDay_ParticipantView);
  }

  ngAfterContentInit() {
    this.userMediaService.getStream().then(s => {
      this.stream = s;
      this.userCameraViewComponent.setSource(s);
      this.audioBarComponent.setSource(s);
    });
  }

  videoLoaded() {
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }

  replay() {
    this.videoViewComponent.play();
  }
}
