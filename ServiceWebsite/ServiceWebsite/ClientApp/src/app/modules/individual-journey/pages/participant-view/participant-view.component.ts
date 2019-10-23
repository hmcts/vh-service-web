import { IndividualJourneySteps } from './../../individual-journey-steps';
import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { VideoUrlService } from '../../services/video-url.service';
import { VideoFiles } from '../../services/video-files';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { VideoViewBaseComponent } from '../../components/video-view-base/video-view-base.component';
import { DeviceType } from '../../../base-journey/services/device-type';
import { MediaService } from 'src/app/services/media.service';
import { Logger } from 'src/app/services/logger';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.css'],
})
export class ParticipantViewComponent extends VideoViewBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent, { static: false })
  userCameraViewComponent: UserCameraViewComponent;

  stream: MediaStream;
  isMobile = false;
  logger: Logger;

  constructor(private journey: IndividualJourney, private userMediaService: MediaService,
    videoUrlService: VideoUrlService, private deviceType: DeviceType, _logger: Logger) {
    super(videoUrlService, VideoFiles.BeforeTheDay_ParticipantView);
    this.logger = _logger;
    this.isMobile = this.deviceType.isMobile() || this.deviceType.isTablet();
  }

  async ngAfterContentInit() {
    if (!this.isMobile) {
      try {
        this.stream = await this.userMediaService.getStream();
        if (this.stream) {
          this.userCameraViewComponent.setSource(this.stream);
        }
      } catch (exception) {
        this.logger.error('Failed to get access to user media', exception);
        if (exception.name === 'NotAllowedError') {
          this.journey.goto(IndividualJourneySteps.MediaAccessError);
        }
      }
    }
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }

  continue() {
    this.journey.goto(IndividualJourneySteps.HelpTheCourtDecide);
  }
}
