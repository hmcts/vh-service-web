import { Injectable, ViewChild, OnInit } from '@angular/core';
import { IndividualBaseComponent } from '../../pages/individual-base-component/individual-base.component';
import { IndividualJourney } from '../../individual-journey';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';

@Injectable()
export class VideoViewBaseComponent extends IndividualBaseComponent implements OnInit {

  constructor(journey: IndividualJourney, private videoUrlService: VideoUrlService,
    private videoFile: VideoFiles) {
    super(journey);
  }

  @ViewChild(VideoViewComponent)
  videoViewComponent: VideoViewComponent;

  videoSource: string;
  disabledReplay = true;

  ngOnInit() {
    this.videoSource = this.videoUrlService.getVideoFileUrl(this.videoFile);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  replay() {
    this.videoViewComponent.play();
  }
}
