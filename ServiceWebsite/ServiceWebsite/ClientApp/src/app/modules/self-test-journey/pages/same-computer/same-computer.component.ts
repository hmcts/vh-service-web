import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { Component } from '@angular/core';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-same-computer',
  templateUrl: './same-computer.component.html',
  styles: []
})
export class SameComputerComponent {
  constructor(private journey: JourneyBase) { }

  continue() {
    // TODO: Add in logic to go to SelfTestJourneySteps.SignInOtherComputer
    this.journey.goto(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
  }
}
