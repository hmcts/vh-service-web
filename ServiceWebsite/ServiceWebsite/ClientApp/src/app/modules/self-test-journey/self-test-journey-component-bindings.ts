import {SelfTestJourneySteps as Steps} from './self-test-journey-steps';
import {Paths} from './paths';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantJourneyStepComponentBindings} from '../base-journey/services/participant-journey-component-bindings';

export class SelfTestJourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.First;

  constructor() {
    super();
    this.bindings.set(Steps.First, Paths.FirstPage);
    this.bindings.set(Steps.Second, Paths.SecondPage);
    this.bindings.set(Steps.Dropout, Paths.DropoutPage);
  }
}
