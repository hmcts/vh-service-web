import {Component, OnInit} from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-self-test',
  templateUrl: './self-test.component.html',
  styles: []
})
export class SelfTestComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

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
