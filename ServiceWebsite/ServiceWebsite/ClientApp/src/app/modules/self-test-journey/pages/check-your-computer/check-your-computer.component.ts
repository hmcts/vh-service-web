import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { DeviceType } from 'src/app/modules/base-journey/services/device-type';
import { Router } from '@angular/router';
import { Paths } from '../../../../paths';
import { ConfigService } from 'src/app/services/config.service';
import { Observable } from 'rxjs';
import { Config } from 'src/app/modules/shared/models/config';

@Component({
  selector: 'app-check-your-computer',
  templateUrl: './check-your-computer.component.html',
  styles: []
})
export class CheckYourComputerComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {
  isRepresentative: boolean;
  isIndividual: boolean;emi
  mobileSupportEnabled = false;

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel,
    private deviceType: DeviceType, private router: Router, private configService: ConfigService) {
    super(journey);
    this.configService.getClientSettings().subscribe(clientSettings => {
      this.mobileSupportEnabled = clientSettings.enable_mobile_support
    })
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.checkYourComputer);
    this.isRepresentative = this.journey.journeyName === 'Representative';
    this.isIndividual = this.journey.journeyName === 'Individual';
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

    if (this.deviceType.isMobile() && !this.mobileSupportEnabled) {
      this.router.navigate([`/${Paths.SignInOnComputer}`]);
      return;
    }

    if (this.deviceType.isTablet() && !this.deviceType.isIpad() && !this.mobileSupportEnabled) {
      this.router.navigate([`/${Paths.SignInOnComputer}`]);
      return;
    }

    this.journey.goto(SelfTestJourneySteps.SwitchOnCameraAndMicrophone);
  }
}
