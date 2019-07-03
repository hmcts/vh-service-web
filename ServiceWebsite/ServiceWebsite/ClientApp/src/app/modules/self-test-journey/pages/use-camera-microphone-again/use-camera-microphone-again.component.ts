import {Component, OnInit} from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';

@Component({
  selector: 'app-use-camera-microphone-again',
  templateUrl: './use-camera-microphone-again.component.html',
  styles: []
})
export class UseCameraMicrophoneAgainComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
  }

  protected bindModel(): void {
  }

  switchOnCameraAndMicrophone(): void {
  }
}
