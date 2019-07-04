import {Component, OnInit} from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';


@Component({
  selector: 'app-microphone-working',
  templateUrl: './microphone-working.component.html',
  styles: []
})
export class MicrophoneWorkingComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.microphoneWorking);
  }

  protected bindModel(): void {
    this.model.selfTest.microphoneWorking = this.choice.value;
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.SeeAndHearVideo);
  }
}
