import {Component, OnInit} from '@angular/core';
import { SuitabilityChoicePageBaseComponent} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';
import { ParticipantJourneySteps } from '../../../base-journey/participant-journey-steps';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-video-working',
  templateUrl: './video-working.component.html',
  styles: []
})
export class VideoWorkingComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.seeAndHearClearly);
  }

  protected bindModel(): void {
    this.model.selfTest.seeAndHearClearly = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    await this.journey.submitQuestionnaire();
    this.journey.goto(ParticipantJourneySteps.ThankYou);
  }

  checkEquipment() {
    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
  }
}
