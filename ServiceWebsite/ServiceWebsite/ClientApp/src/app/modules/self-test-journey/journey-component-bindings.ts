import { SelfTestJourneySteps as Steps } from './self-test-journey-steps';
import { Paths } from './paths';
import { JourneyStep } from '../base-journey/journey-step';
import { ParticipantJourneyStepComponentBindings } from '../base-journey/services/participant-journey-component-bindings';

export class JourneyStepComponentBindings extends ParticipantJourneyStepComponentBindings {
    readonly bindings = new Map<JourneyStep, string>();
    readonly initialStep = Steps.First;
    constructor() {
        super();
        this.bindings.set(Steps.First, Paths.TestPage);
        this.bindings.set(Steps.Dropout, Paths.TestPage);
    }
}
