import { EventEmitter, Injectable } from '@angular/core';

export enum IndividualJourneySteps {
    AboutHearings = 1,
    InformationVideo = 2
}

class StepTransition {
    private transition: Function;

    constructor(transitionLogic: Function) {
        this.transition = transitionLogic;
    }

    run(): IndividualJourneySteps {
        return this.transition();
    }
}

@Injectable()
export class IndividualJourney {
    readonly redirect: EventEmitter<IndividualJourneySteps> = new EventEmitter();

    private currentStep: IndividualJourneySteps;

    private readonly stepLogic = new Map<IndividualJourneySteps, StepTransition>();

    constructor() {
        this.addStepLogic(IndividualJourneySteps.AboutHearings, () => IndividualJourneySteps.InformationVideo);

        this.redirect.subscribe((step: IndividualJourneySteps) => this.currentStep = step);
    }

    addStepLogic(step: IndividualJourneySteps, logic: Function) {
        const transition = new StepTransition(logic);
        this.stepLogic.set(step, transition);
    }

    private goto(step: IndividualJourneySteps) {
        if (this.currentStep !== step) {
            this.redirect.emit(step);
        }
    }

    /**
     * Enter the journey at a given step
     */
    enter(step: IndividualJourneySteps) {
        this.currentStep = step;
        console.log(`entered journey at ${step}`);
    }

    begin() {
        this.goto(IndividualJourneySteps.AboutHearings);
    }

    next() {
        const transition = this.stepLogic.get(this.currentStep);
        if (transition) {
            this.goto(transition.run());
        } else {
            throw new Error('Missing transition for step: ' + this.currentStep);
        }
    }

    /**
     * Fast forwards or rewinds the journey to a given place.
     * @param position The step to jump to
     */
    jumpTo(position: IndividualJourneySteps) {
        this.currentStep = position;
    }
}
