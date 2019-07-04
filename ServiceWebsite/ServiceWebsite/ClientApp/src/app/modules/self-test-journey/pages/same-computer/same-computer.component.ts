import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-same-computer',
  templateUrl: './same-computer.component.html',
  styles: []
})
export class SameComputerComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.sameComputer);
  }

  protected bindModel(): void {
    this.model.selfTest.sameComputer = this.choice.value;
  }
  continue() {
    // TODO: Add in logic to go to SelfTestJourneySteps.SignInOtherComputer
    this.journey.goto(SelfTestJourneySteps.UseCameraAndMicrophoneAgain);
  }
}
