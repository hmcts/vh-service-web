import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { DeviceType } from '../../services/device-type';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-explore-video-hearing',
  templateUrl: './explore-video-hearing.component.html',
  styles: []
})
export class ExploreVideoHearingComponent extends IndividualBaseComponent {

  constructor(journey: IndividualJourney, private deviceType: DeviceType) {
    super(journey);
  }

  get isMobile(): boolean {
    return this.deviceType.isMobile();
  }
}
