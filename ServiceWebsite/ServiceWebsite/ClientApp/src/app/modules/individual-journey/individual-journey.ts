import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualSuitabilityModel, HasAccessToCamera } from './individual-suitability.model';

export enum IndividualJourneySteps {
    NotStarted, // default
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
    MediaAccessError,
    GotoVideoApp
}

@Injectable()
export class IndividualJourney implements JourneyBase {
    static readonly initialStep = IndividualJourneySteps.AboutHearings;

    readonly redirect: EventEmitter<IndividualJourneySteps> = new EventEmitter();

    private readonly stepOrder: IndividualJourneySteps[] = [
        IndividualJourney.initialStep,
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

    private currentStep: IndividualJourneySteps = IndividualJourneySteps.NotStarted;

    private currentModel: IndividualSuitabilityModel;

    private isDone: boolean;

    constructor() {
        this.redirect.subscribe((step: IndividualJourneySteps) => this.currentStep = step);
    }

    get step(): IndividualJourneySteps {
        return this.currentStep;
    }

    forSuitabilityAnswers(suitabilityAnswers: IndividualSuitabilityModel[]) {
        const upcoming = suitabilityAnswers.filter(hearing => hearing.isUpcoming());
        if (upcoming.length === 0) {
            this.isDone = true;
            return;
        }

        for (const answers of suitabilityAnswers) {
            if (this.isSuitabilityAnswersComplete(answers)) {
                this.isDone = true;
                return;
            }
        }

        // sort upcoming on date and pick the earliest
        upcoming.sort((u1, u2) => u1.hearing.scheduleDateTime.getTime() - u2.hearing.scheduleDateTime.getTime());
        this.currentModel = upcoming[0];
    }

    startAt(step: IndividualJourneySteps) {
        this.assertInitialised();
        if (this.isDone) {
            this.goto(IndividualJourneySteps.GotoVideoApp);
        } else {
            this.goto(step);
        }
    }

    get model(): IndividualSuitabilityModel {
        return this.currentModel;
    }

    private isSuitabilityAnswersComplete(model: IndividualSuitabilityModel): boolean {
        return model.aboutYou.answer !== undefined
            && model.consent.answer !== undefined
            && model.computer !== undefined
            && model.internet !== undefined
            && model.interpreter !== undefined
            && model.room !== undefined;
    }

    private goto(step: IndividualJourneySteps) {
        if (this.currentStep !== step) {
            this.redirect.emit(step);
        }
    }

    next() {
        this.assertInitialised();
        this.assertEntered();

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

    /**
     * Sets the journey to a specific step. This can be used when navigating to a specific step in the journey.
     * @param position The step to jump to
     */
    jumpTo(position: IndividualJourneySteps) {
        this.assertInitialised();
        if (this.isDone) {
            this.goto(IndividualJourneySteps.GotoVideoApp);
        } else {
            this.currentStep = position;
        }
    }

    /**
     * The journey must know if the user has any upcoming hearings and if the suitability has been answered for these.
     */
    private assertInitialised() {
        if (this.isDone || this.model) {
            return;
        }

        // we've not initialised the journey
        throw new Error('Journey must be initialised with suitability answers');
    }

    private assertEntered() {
        if (this.currentStep === IndividualJourneySteps.NotStarted) {
            throw new Error('Journey must be entered before navigation is allowed');
        }
    }
}
