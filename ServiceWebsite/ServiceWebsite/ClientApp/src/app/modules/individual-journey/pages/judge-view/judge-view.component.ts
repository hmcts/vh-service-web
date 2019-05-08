import { Component, ViewChild, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { HearingViewBaseComponent } from '../../components/hearing-view-base.component';
import { VideoFiles } from '../../services/video-files';

@Component({
  selector: 'app-judge-view',
  templateUrl: './judge-view.component.html',
  styleUrls: ['./judge-view.component.css'],
})
export class JudgeViewComponent extends HearingViewBaseComponent implements OnInit {

  @ViewChild('videoParticipant')
  videoViewComponent: VideoViewComponent;

  @ViewChild('videoJudge')
  videoViewComponentJudge: VideoViewComponent;

  videoSourceJudge: string;
  videoSourceParticipant: string;
  widthAudioBar = 230;

  constructor(journey: IndividualJourney, userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(userMediaService, journey);
  }

  ngOnInit() {
    this.videoSourceJudge = this.videoUrlService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Judge);
    this.videoSourceParticipant = this.videoUrlService.getVideoFileUrl(VideoFiles.BeforeTheDay_JudgeView_Participant);
  }

  replay() {
    this.videoViewComponent.play();
    this.videoViewComponentJudge.play();
  }
}
