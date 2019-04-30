import { Component, ViewChild, OnInit} from '@angular/core';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { AudioBarComponent } from '../../components/audio-bar/audio-bar.component';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { BlobVideoStorageService } from '../../services/blob-video-storage.service';
import { HearingViewBaseComponent } from '../../components/hearing-view-base.component';

@Component({
  selector: 'app-judge-view',
  templateUrl: './judge-view.component.html',
  styleUrls: ['./judge-view.component.css'],
  providers: [
    { provide: MediaService, useClass: UserMediaService },
    { provide: VideoUrlService, useClass: BlobVideoStorageService }
  ]
})
export class JudgeViewComponent extends HearingViewBaseComponent implements OnInit {
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

  constructor(journey: IndividualJourney, userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(userMediaService, journey);
  }

  ngOnInit() {
    this.videoSourceJudge = this.videoUrlService.judgeSelfViewVideo;
    this.videoSourceParticipant = this.videoUrlService.otherParticipantExampleVideo;
  }

  async ngAfterContentInit() {
    await super.ngAfterContentInit();
    this.userCameraViewComponent.setSource(this.stream);
    this.audioBarComponent.setSource(this.stream);
  }
 
  replay() {
    this.videoViewComponent.play();
    this.videoViewComponentJudge.play();
  }
}
