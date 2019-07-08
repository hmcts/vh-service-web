import { RepresentativeJourneySteps as Steps } from '../representative-journey-steps';
import { Paths } from '../../representative-journey/paths';
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
    readonly initialStep = Steps.AboutVideoHearings;
    constructor(selfTest: SelfTestJourneyStepComponentBindings) {
        super();
        this.bindings.set(Steps.AboutVideoHearings, Paths.AboutVideoHearings);
        this.bindings.set(Steps.AboutYouAndYourClient, Paths.AboutYouAndYourClient);
        this.bindings.set(Steps.AboutYou, Paths.AboutYou);
        this.bindings.set(Steps.AccessToRoom, Paths.AccessToRoom);
        this.bindings.set(Steps.AboutYourClient, Paths.AboutYourClient);
        this.bindings.set(Steps.ClientAttendance, Paths.ClientAttendance);
        this.bindings.set(Steps.HearingSuitability, Paths.HearingSuitability);
        this.bindings.set(Steps.AccessToComputer, Paths.YourComputer);
        this.bindings.set(Steps.AboutYourComputer, Paths.AboutYourComputer);
        this.bindings.set(Steps.QuestionnaireCompleted, Paths.QuestionnaireCompleted);
        this.bindings.set(Steps.ContactUs, Paths.ContactUs);
        this.bindings.set(Steps.ThankYou, Paths.ThankYou);
        selfTest.bindings.forEach((path, step) => this.bindings.set(step, path));
    }


}
