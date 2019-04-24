import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';

export enum IndividualJourneySteps {
    AboutHearings,
    DifferentHearingTypes,
    ExploreCourtBuilding,
    CourtInformationVideo,
    AccessToCameraAndMicrophone,
    HearingAsParticipant,
    HearingAsJudge,
    HelpTheCourtDecide,
    AboutYou,
    Interpreter,
    AccessToComputer,
    AboutYourComputer,
    YourInternetConnection,
    AccessToRoom,
    Consent,
    ThankYou,
    MediaAccessError
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
export class IndividualJourney implements JourneyBase {
    readonly redirect: EventEmitter<IndividualJourneySteps> = new EventEmitter();

    private currentStep: IndividualJourneySteps;

    private readonly stepLogic = new Map<IndividualJourneySteps, StepTransition>();

    constructor() {
        this.addStepLogic(IndividualJourneySteps.AboutHearings, () => IndividualJourneySteps.DifferentHearingTypes);
        this.addStepLogic(IndividualJourneySteps.DifferentHearingTypes, () => IndividualJourneySteps.ExploreCourtBuilding);
        this.addStepLogic(IndividualJourneySteps.ExploreCourtBuilding, () => IndividualJourneySteps.CourtInformationVideo);
        this.addStepLogic(IndividualJourneySteps.CourtInformationVideo, () => IndividualJourneySteps.AccessToCameraAndMicrophone);
        this.addStepLogic(IndividualJourneySteps.AccessToCameraAndMicrophone, () => IndividualJourneySteps.HearingAsParticipant);
        this.addStepLogic(IndividualJourneySteps.HearingAsParticipant, () => IndividualJourneySteps.HearingAsJudge);
        this.addStepLogic(IndividualJourneySteps.HearingAsJudge, () => IndividualJourneySteps.HelpTheCourtDecide);
        this.addStepLogic(IndividualJourneySteps.HelpTheCourtDecide, () => IndividualJourneySteps.AboutYou);
        this.addStepLogic(IndividualJourneySteps.AboutYou, () => IndividualJourneySteps.Interpreter);
        this.addStepLogic(IndividualJourneySteps.Interpreter, () => IndividualJourneySteps.AccessToComputer);
        this.addStepLogic(IndividualJourneySteps.AccessToComputer, () => IndividualJourneySteps.AboutYourComputer);
        this.addStepLogic(IndividualJourneySteps.AboutYourComputer, () => IndividualJourneySteps.YourInternetConnection);
        this.addStepLogic(IndividualJourneySteps.YourInternetConnection, () => IndividualJourneySteps.AccessToRoom);
        this.addStepLogic(IndividualJourneySteps.AccessToRoom, () => IndividualJourneySteps.Consent);
        this.addStepLogic(IndividualJourneySteps.Consent, () => IndividualJourneySteps.ThankYou);

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

    begin() {
        this.goto(IndividualJourneySteps.AboutHearings);
    }

    next() {
        const transition = this.stepLogic.get(this.currentStep);
        if (transition) {
            this.goto(transition.run());
        } else {
            throw new Error('Missing transition for step: ' + IndividualJourneySteps[this.currentStep]);
        }
    }

    fail() {
        const dropoutToThankYouFrom = [
            IndividualJourneySteps.AccessToComputer,
            IndividualJourneySteps.AboutYourComputer,
            IndividualJourneySteps.YourInternetConnection,
            IndividualJourneySteps.Consent
        ];

        if (dropoutToThankYouFrom.includes(this.currentStep)) {
            this.goto(IndividualJourneySteps.ThankYou);
        } else if (this.currentStep === IndividualJourneySteps.AccessToCameraAndMicrophone) {
            this.goto(IndividualJourneySteps.MediaAccessError);
        } else {
            throw new Error(`Missing/unexpected failure for step: ${IndividualJourneySteps[this.currentStep]}`);
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
