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
  selector: 'app-judge-view',
  templateUrl: './judge-view.component.html',
  styleUrls: ['./judge-view.component.css'],
  providers: [
    { provide: MediaService, useClass: UserMediaService },
    { provide: VideoUrlService, useClass: BlobVideoStorageService }
  ]
})
export class JudgeViewComponent extends IndividualBaseComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent;

  @ViewChild(AudioBarComponent)
  audioBarComponent: AudioBarComponent;

  @ViewChild('videoParticipant')
  videoViewComponent: VideoViewComponent;

  @ViewChild('videoJudge')
  videoViewComponentJudge: VideoViewComponent;

  widthVideo = 495;
  widthAudioBar = 230;
  videoSourceJudge: string;
  videoSourceParticipant: string;
  disabledReplay = true;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(journey);
  }

  ngOnInit() {
    this.videoSourceJudge = this.videoUrlService.judgeSelfViewVideo;
    this.videoSourceParticipant = this.videoUrlService.otherParticipantExampleVideo;
  }

  async ngAfterContentInit() {
    const stream = await this.userMediaService.getStream();
    this.userCameraViewComponent.setSource(stream);
    this.audioBarComponent.setSource(stream);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }
  
  ngOnDestroy() {
    this.userMediaService.stopStream();
  }

  replay() {
    this.videoViewComponent.play();
    this.videoViewComponentJudge.play();
  }
}
