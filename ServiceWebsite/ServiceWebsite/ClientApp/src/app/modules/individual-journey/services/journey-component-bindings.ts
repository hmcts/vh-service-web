import { ParticipantJourneySteps as Steps } from '../../base-journey/participant-journey-steps';
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
    readonly initialStep = Steps.CheckingVideoHearing;
    readonly finalStep = Steps.ThankYou;
    constructor(selfTest: SelfTestJourneyStepComponentBindings) {
        super();
        this.bindings.set(Steps.CheckingVideoHearing, Paths.ChekingVideoHearing);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        selfTest.bindings.forEach((path, step) => this.bindings.set(step, path));
    }
}
