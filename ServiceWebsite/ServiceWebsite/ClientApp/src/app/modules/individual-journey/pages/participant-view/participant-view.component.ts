import { Component, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { UserMediaService } from '../../services/user-media.service';
import { UserCameraViewComponent } from '../../components/user-camera-view/user-camera-view.component';
import { IndividualJourney } from '../../individual-journey';
import { MediaService } from '../../services/media.service';
import { LoggerService } from '../../../../services/logger.service';

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styles: [],
  providers: [{ provide: MediaService, useClass: UserMediaService }]
})
export class ParticipantViewComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  @ViewChild(UserCameraViewComponent)
  userCameraViewComponent: UserCameraViewComponent

  stream: MediaStream;
  widthVideo = 410;

  constructor(journey: IndividualJourney, private userMediaService: MediaService,
    private loggerService: LoggerService) {
    super(journey);
  }

  ngAfterContentInit() {
    this.userMediaService.getStream().then(s => {
      if (s instanceof MediaStream) {
        this.stream = s;
        this.userCameraViewComponent.setSource(s);
      } else {
        this.loggerService.error('Error to use camera or microphone', s);
      }
    });
  }

  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
