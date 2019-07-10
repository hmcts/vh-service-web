import {Component, OnInit} from '@angular/core';
import {JourneyBase} from '../../../base-journey/journey-base';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

@Component({
  selector: 'app-switch-on-camera-and-microphone',
  templateUrl: './switch-on-camera-and-microphone.component.html',
  styles: []
})
export class SwitchOnCameraAndMicrophoneComponent implements OnInit {

  constructor(private journey: JourneyBase) {

  }

  ngOnInit(): void {
  }

  switchOnCameraAndMicrophone(): void {
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.TestYourEquipment);
  }
}
