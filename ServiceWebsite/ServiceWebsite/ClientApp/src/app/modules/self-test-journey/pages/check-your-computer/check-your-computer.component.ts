import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';

@Component({
  selector: 'app-check-your-computer',
  templateUrl: './check-your-computer.component.html',
  styles: []
})
export class CheckYourComputerComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel, private deviceType: DeviceType) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.checkYourComputer);
  }

  protected bindModel(): void {
    this.model.selfTest.checkYourComputer = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    if (!this.model.selfTest.checkYourComputer) {
      this.journey.goto(SelfTestJourneySteps.SignBackIn);
      return;
    }

    if (this.deviceType.isMobile() || this.deviceType.isTablet()) {
      this.journey.goto(SelfTestJourneySteps.SignInOnComputer);
      return;
    }

    this.journey.goto(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
  }
}
