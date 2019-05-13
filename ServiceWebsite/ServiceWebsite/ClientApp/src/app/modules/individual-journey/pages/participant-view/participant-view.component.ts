import { Component, ViewChild, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { HearingViewBaseComponent } from '../../components/hearing-view-base.component';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css'],
})
export class ParticipantViewComponent extends HearingViewBaseComponent implements OnInit {

  @ViewChild(VideoViewComponent)
  videoViewComponent: VideoViewComponent;

  videoSource: string;

  constructor(journey: IndividualJourney, userMediaService: MediaService,
    private videoUrlService: VideoUrlService) {
    super(userMediaService, journey);
  }

  ngOnInit() {
    this.videoSource = this.videoUrlService.inHearingExampleVideo;
  }

  replay() {
    this.videoViewComponent.play();
  }
}
