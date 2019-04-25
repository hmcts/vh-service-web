import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualSuitabilityModel, IndividualSuitability } from './individual-suitability.model';

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

    constructor() {
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
        this.model = {
            computer: IndividualSuitability.HasComputerAnswer.No,
            internet: {
                answer: true,
                notes: ''
            },
            interpreter: false,
            consent: {
                answer: true,
                notes: ''
            },
            room: {
                answer: true,
                notes: ''
            },
            aboutYou: {
                answer: true,
                notes: ''
            }
        };
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
        const currentStep = this.stepOrder.indexOf(this.currentStep);
        if (currentStep < 0 || currentStep === this.stepOrder.length - 1) {
            throw new Error('Missing transition for step: ' + IndividualJourneySteps[this.currentStep]);
        }

        this.goto(currentStep + 1);
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
