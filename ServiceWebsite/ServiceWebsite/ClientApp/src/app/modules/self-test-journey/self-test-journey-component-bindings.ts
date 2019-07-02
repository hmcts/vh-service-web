import {SelfTestJourneySteps as Steps} from './self-test-journey-steps';
import {Paths} from './paths';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantJourneyStepComponentBindings} from '../base-journey/services/participant-journey-component-bindings';

export class SelfTestJourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.SameComputer;

  constructor() {
    super();
    this.bindings.set(Steps.SameComputer, Paths.SameComputer);
    this.bindings.set(Steps.SignInOtherComputer, Paths.SignInOtherComputer);
    this.bindings.set(Steps.UseCameraAndMicrophoneAgain, Paths.UseCameraAndMicrophoneAgain);
    this.bindings.set(Steps.SelfTest, Paths.SelfTest);

  }
}
