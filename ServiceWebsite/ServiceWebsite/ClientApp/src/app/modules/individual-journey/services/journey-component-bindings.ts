import { IndividualJourneySteps as Steps } from '../individual-journey-steps';
import { Paths } from '../paths';
import { JourneyStep } from '../../base-journey/journey-step';
import { ParticipantJourneyStepComponentBindings } from '../../base-journey/services/participant-journey-component-bindings';
import { SelfTestJourneyStepComponentBindings } from '../../self-test-journey/self-test-journey-component-bindings';
import { Injectable } from '@angular/core';

/**
 * Binds journey steps to components
 */
@Injectable()
export class JourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.AboutHearings;
  readonly finalStep = Steps.ThankYou;
  constructor(selfTest: SelfTestJourneyStepComponentBindings) {
    super();
    this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
    this.bindings.set(Steps.AboutYou, Paths.AboutYou);
    this.bindings.set(Steps.AboutHearings, Paths.AboutHearings);
    this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
    this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
    this.bindings.set(Steps.Consent, Paths.Consent);
    this.bindings.set(Steps.AnswersSaved, Paths.AnswersSaved);
    this.bindings.set(Steps.DifferentHearingTypes, Paths.DifferentHearingTypes);
    this.bindings.set(Steps.Interpreter, Paths.Interpreter);
    this.bindings.set(Steps.MediaAccessError, Paths.MediaError);
    this.bindings.set(Steps.ThankYou, Paths.ThankYou);
    this.bindings.set(Steps.YourInternetConnection, Paths.YourInternetConnection);
    this.bindings.set(Steps.SignInOnComputer, Paths.SignInOnComputer);
    selfTest.bindings.forEach((path, step) => this.bindings.set(step, path));
  }
}
