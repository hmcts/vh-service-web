import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-camera-working',
  templateUrl: './camera-working.component.html',
  styles: []
})
export class CameraWorkingComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.cameraWorking);
  }

  protected bindModel(): void {
    this.model.selfTest.cameraWorking = this.choice.value;
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.SeeAndHearVideo);
  }

  checkEquipment() {
    this.journey.goto(SelfTestJourneySteps.SelfTest);
   }
}
