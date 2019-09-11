import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent} from '../../../base-journey/components/suitability-choice-page-base.component';
import { JourneyBase } from '../../../base-journey/journey-base';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import {Logger} from '../../../../services/logger';

@Component({
  selector: 'app-camera-working',
  templateUrl: './camera-working.component.html',
  styles: []
})
export class CameraWorkingComponent extends SuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel, private logger: Logger) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.cameraWorking);
  }

  protected bindModel(): void {
    this.model.selfTest.cameraWorking = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    this.journey.goto(SelfTestJourneySteps.MicrophoneWorking);
  }

  checkEquipment() {
    this.logger.event('(checkEquipment -> Checking equipment again.)',
      {hearingId: this.model.hearing.id, participantId: this.model.participantId});

    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
   }
}
