import {SelfTestJourneySteps as Steps} from './self-test-journey-steps';
import {Paths} from './paths';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantJourneyStepComponentBindings} from '../base-journey/services/participant-journey-component-bindings';
import { Injectable } from '@angular/core';

@Injectable()
export class SelfTestJourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.CheckYourComputer;
  readonly finalStep = Steps.VideoWorking;
  constructor() {
    super();
    this.bindings.set(Steps.CheckYourComputer, Paths.CheckYourComputer);
    this.bindings.set(Steps.SignBackIn, Paths.SignBackIn);
    this.bindings.set(Steps.SwitchOnCameraAndMicrophone, Paths.SwitchOnCameraAndMicrophone);
    this.bindings.set(Steps.TestYourEquipment, Paths.TestYourEquipment);
    this.bindings.set(Steps.CameraWorking, Paths.CameraWorking);
    this.bindings.set(Steps.MicrophoneWorking, Paths.MicrophoneWorking);
    this.bindings.set(Steps.VideoWorking, Paths.VideoWorking);
    this.bindings.set(Steps.EquipmentBlocked, Paths.EquipmentBlocked);
    this.bindings.set(Steps.SignInOnComputer, Paths.SignInOnComputer);
  }
}
