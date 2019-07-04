import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { Component } from '@angular/core';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-use-camera-microphone-again',
  templateUrl: './use-camera-microphone-again.component.html',
  styles: []
})
export class UseCameraMicrophoneAgainComponent {
  constructor(private journey: JourneyBase) { }

  continue() {
    this.journey.goto(SelfTestJourneySteps.SelfTest);
  }
}
