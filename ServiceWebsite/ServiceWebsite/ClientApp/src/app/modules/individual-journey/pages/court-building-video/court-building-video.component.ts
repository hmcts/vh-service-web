import { Component } from '@angular/core';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { IndividualJourney } from '../../individual-journey';
import { VideoViewBaseComponentDirective as VideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-court-building-video',
  templateUrl: './court-building-video.component.html',
  styles: []
})
export class CourtBuildingVideoComponent extends VideoViewBaseComponent {

  constructor(private journey: IndividualJourney, videoUrlService: VideoUrlService) {
    super(videoUrlService, VideoFiles.BeforeTheDay_Court);
  }

  continue() {
    this.videoViewComponent.ngOnDestroy();
    this.journey.goto(IndividualJourneySteps.ExploreVideoHearing);
  }
}
