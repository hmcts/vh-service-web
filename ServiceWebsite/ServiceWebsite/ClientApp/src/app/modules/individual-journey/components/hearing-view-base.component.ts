import { Injectable, AfterContentInit, OnDestroy } from '@angular/core';
import { MediaService } from '../services/media.service';
import { IndividualBaseComponent } from '../pages/individual-base-component/individual-base.component';
import { IndividualJourney } from '../individual-journey';

@Injectable()
export class HearingViewBaseComponent extends IndividualBaseComponent implements AfterContentInit, OnDestroy {

  constructor(private userMediaService: MediaService, journey: IndividualJourney) {
    super(journey);
  }

  stream: MediaStream;
  disabledReplay = true;

  async ngAfterContentInit() {
    this.stream = await this.userMediaService.getStream();
  }

  videoLoaded() {
    this.disabledReplay = false;
  }
  ngOnDestroy() {
    this.userMediaService.stopStream();
  }
}
