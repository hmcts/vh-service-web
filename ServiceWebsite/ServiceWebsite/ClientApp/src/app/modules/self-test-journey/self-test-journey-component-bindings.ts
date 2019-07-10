import {SelfTestJourneySteps as Steps} from './self-test-journey-steps';
import {Paths} from './paths';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantJourneyStepComponentBindings} from '../base-journey/services/participant-journey-component-bindings';

export class SelfTestJourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.CheckYourComputer;

  constructor() {
    super();
    this.bindings.set(Steps.CheckYourComputer, Paths.CheckYourComputer);
    this.bindings.set(Steps.SignInOtherComputer, Paths.SignInOtherComputer);
    this.bindings.set(Steps.SwitchOnCameraAndMicrophone, Paths.SwitchOnCameraAndMicrophone);
    this.bindings.set(Steps.SelfTest, Paths.SelfTest);
    this.bindings.set(Steps.CameraWorking, Paths.CameraWorking);
    this.bindings.set(Steps.MicrophoneWorking, Paths.MicrophoneWorking);
    this.bindings.set(Steps.SeeAndHearVideo, Paths.SeeAndHearVideo);

  }
}
