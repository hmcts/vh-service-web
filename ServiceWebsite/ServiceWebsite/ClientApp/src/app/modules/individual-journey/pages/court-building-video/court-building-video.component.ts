import { Component, OnInit } from '@angular/core';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { IndividualJourney } from '../../individual-journey';
import { VideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component';

@Component({
  selector: 'app-court-building-video',
  templateUrl: './court-building-video.component.html',
  styles: []
})
export class CourtBuildingVideoComponent extends VideoViewBaseComponent implements OnInit {

  constructor(journey: IndividualJourney, videoUrlService: VideoUrlService) {
    super(journey, videoUrlService);
  }

  ngOnInit() {
    this.videoFile = VideoFiles.BeforeTheDay_Court;
    super.ngOnInit();
  }
}
