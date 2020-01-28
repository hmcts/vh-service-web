import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { Router } from '@angular/router';
import { Paths } from '../../../../paths';

@Component({
  selector: 'app-check-your-computer',
  templateUrl: './check-your-computer.component.html',
  styles: []
})
export class CheckYourComputerComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {
  isRepresentative: boolean;
  isIndividual: boolean;
  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel,
    private deviceType: DeviceType, private router: Router) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.checkYourComputer);
    this.isRepresentative = this.journey.constructor.name === 'RepresentativeJourney';
    this.isIndividual = this.journey.constructor.name === 'IndividualJourney';
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
      this.router.navigate([`/${Paths.SignInOnComputer}`]);
      return;
    }

    this.journey.goto(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
  }
}
