import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { Component } from '@angular/core';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-camera-working',
  templateUrl: './camera-working.component.html',
  styles: []
})
export class CameraWorkingComponent {
  constructor(private journey: JourneyBase) { }

  continue() {
    this.journey.goto(SelfTestJourneySteps.SeeAndHearVideo);
  }
}
