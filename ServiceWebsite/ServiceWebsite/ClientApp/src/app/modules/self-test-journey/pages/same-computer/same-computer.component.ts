import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

@Component({
  selector: 'app-same-computer',
  templateUrl: './same-computer.component.html',
  styles: []
})
export class SameComputerComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel, private deviceType: DeviceType) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.sameComputer);
  }

  protected bindModel(): void {
    this.model.selfTest.sameComputer = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    if (!this.model.selfTest.sameComputer || this.deviceType.isMobile()) {
      this.journey.goto(SelfTestJourneySteps.SignInOtherComputer);
    } else {
      this.journey.goto(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
    }
  }
}
