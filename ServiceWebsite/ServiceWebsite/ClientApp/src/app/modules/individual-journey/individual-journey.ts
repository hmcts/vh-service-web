import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualSuitabilityModel, HasAccessToCamera, SuitabilityAnswer } from './individual-suitability.model';

const IndividualUserType = 'Individual';

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

@Injectable()
export class IndividualJourney implements JourneyBase {
    readonly redirect: EventEmitter<IndividualJourneySteps> = new EventEmitter();

    private currentStep: IndividualJourneySteps;

    private readonly stepOrder: IndividualJourneySteps[];

    readonly model: IndividualSuitabilityModel;

    constructor(model: IndividualSuitabilityModel) {
        this.model = model;

        this.stepOrder = [
            IndividualJourneySteps.AboutHearings,
            IndividualJourneySteps.DifferentHearingTypes,
            IndividualJourneySteps.ExploreCourtBuilding,
            IndividualJourneySteps.CourtInformationVideo,
            IndividualJourneySteps.AccessToCameraAndMicrophone,
            IndividualJourneySteps.HearingAsParticipant,
            IndividualJourneySteps.HearingAsJudge,
            IndividualJourneySteps.HelpTheCourtDecide,
            IndividualJourneySteps.AboutYou,
            IndividualJourneySteps.Interpreter,
            IndividualJourneySteps.AccessToComputer,
            IndividualJourneySteps.AboutYourComputer,
            IndividualJourneySteps.YourInternetConnection,
            IndividualJourneySteps.AccessToRoom,
            IndividualJourneySteps.Consent,
            IndividualJourneySteps.ThankYou
        ];

        this.redirect.subscribe((step: IndividualJourneySteps) => this.currentStep = step);
    }

    private goto(step: IndividualJourneySteps) {
        if (this.currentStep !== step) {
            this.redirect.emit(step);
        }
    }

    /**
     * Get the current step
     */
    get step(): IndividualJourneySteps {
        return this.currentStep;
    }

    begin() {
        this.goto(IndividualJourneySteps.AboutHearings);
    }

    next() {
        const currentStep = this.stepOrder.indexOf(this.currentStep);
        if (currentStep < 0 || currentStep === this.stepOrder.length - 1) {
            throw new Error('Missing transition for step: ' + IndividualJourneySteps[this.currentStep]);
        }

        let nextStep = this.stepOrder[currentStep + 1];

        // access to a computer.
        if (this.model.computer === false) {
            nextStep = IndividualJourneySteps.ThankYou;
        }
        // access to a camera and microphone.
        if (this.model.camera === HasAccessToCamera.No) {
            nextStep = IndividualJourneySteps.ThankYou;
        }
        // access to the internet.
        if (this.model.internet === false) {
            nextStep = IndividualJourneySteps.ThankYou;
        }
        this.goto(nextStep);
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

    handles(userType: string): boolean {
        return userType === IndividualUserType;
    }

    /**
     * Fast forwards or rewinds the journey to a given place.
     * @param position The step to jump to
     */
    jumpTo(position: IndividualJourneySteps) {
        this.currentStep = position;
    }
}
