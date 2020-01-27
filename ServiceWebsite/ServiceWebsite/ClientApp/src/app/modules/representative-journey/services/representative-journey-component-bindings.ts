import { RepresentativeJourneySteps as Steps } from '../representative-journey-steps';
import { Paths } from '../paths';
import { JourneyStep } from '../../base-journey/journey-step';
import { ParticipantJourneyStepComponentBindings } from '../../base-journey/services/participant-journey-component-bindings';
import { SelfTestJourneyStepComponentBindings } from '../../self-test-journey/self-test-journey-component-bindings';
import { Injectable } from '@angular/core';


/**
 * Binds journey steps to components
 */
@Injectable()
export class RepresentativeJourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
  readonly bindings = new Map<JourneyStep, string>();
  readonly initialStep = Steps.YourVideoHearing;
  readonly finalStep = Steps.ThankYou;
    constructor(selfTest: SelfTestJourneyStepComponentBindings) {
        super();
        this.bindings.set(Steps.AboutYou, Paths.AboutYou);
        this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
        this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
        this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
        this.bindings.set(Steps.YourVideoHearing, Paths.YourVideoHearing);
        this.bindings.set(Steps.PresentingTheCase, Paths.PresentingTheCase);
        this.bindings.set(Steps.OtherInformation, Paths.OtherInformation);
        this.bindings.set(Steps.AnswersSaved, Paths.AnswersSaved);
        this.bindings.set(Steps.CheckYourComputer, Paths.CheckYourComputer);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        selfTest.bindings.forEach((path, step) => this.bindings.set(step, path));
    }
}
