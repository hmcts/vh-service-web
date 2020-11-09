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
        this.bindings.set(Steps.AboutHearings, Paths.AboutHearings);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        selfTest.bindings.forEach((path, step) => this.bindings.set(step, path));
    }
}
