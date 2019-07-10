import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-test-your-equipment',
  templateUrl: './test-your-equipment.component.html',
  styles: []
})
export class TestYourEquipmentComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
  }

  protected bindModel(): void {
  }

  replayVideo(): void {
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.CameraWorking);
  }
}
