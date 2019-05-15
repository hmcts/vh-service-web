import { Component, ViewChild, OnInit } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { VideoViewComponent } from '../../components/video-view/video-view.component';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-court-building-video',
  templateUrl: './court-building-video.component.html',
  styles: []
})
export class CourtBuildingVideoComponent extends IndividualBaseComponent implements OnInit {

  @ViewChild(VideoViewComponent)
  videoViewComponent: VideoViewComponent;

  videoSource: string;
  disabledReplay = true;

  constructor(journey: IndividualJourney, private videoUrlService: VideoUrlService) {
    super(journey);
  }

  ngOnInit() {
    this.videoSource = this.videoUrlService.getVideoFileUrl(VideoFiles.BeforeTheDay_Court);
  }

  videoLoaded() {
    this.disabledReplay = false;
  }

  replay() {
    this.videoViewComponent.play();
  }
}
