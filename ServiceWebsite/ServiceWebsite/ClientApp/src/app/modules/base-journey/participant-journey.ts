import { HearingSelector } from '../base-journey/hearing-selector';
import { ParticipantSuitabilityModel } from '../base-journey/participant-suitability.model';

import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { ParticipantJourneySteps } from './participant-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';
import { Logger } from 'src/app/services/logger';
//import { SessionStorage } from '../shared/services/session-storage';

@Injectable()
export class ParticipantJourney extends JourneyBase {
    readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
    private currentStep: JourneyStep = ParticipantJourneySteps.NotStarted;
    private currentModel: ParticipantSuitabilityModel;

   // private readonly cache: SessionStorage<string>;

    journeyName: string;

    constructor(protected submitService: SubmitService, protected logger: Logger) {
        super();
        //this.cache = new SessionStorage<string>('JOURNEY_TYPE');
       // this.journeyName = this.cache.get();
        this.redirect.subscribe((step: JourneyStep) => {
            this.logger.event(`telemetry:serviceweb:${this.journeyName}:step:${step}`);
            this.currentStep = step;
        });
    }

    get step(): ParticipantJourneySteps {
        return this.currentStep;
    }

    forSuitabilityAnswers(suitabilityAnswers: ParticipantSuitabilityModel[]) {
        const isPending = (answers: ParticipantSuitabilityModel) => !answers.isCompleted();
        const selector = new HearingSelector(isPending, suitabilityAnswers, this.logger);
        if (selector.isDone) {
            this.redirect.emit(ParticipantJourneySteps.GotoVideoApp);
        } else {
            this.currentModel = selector.selected;
        }
    }

    continueWithModel(model: ParticipantSuitabilityModel) {
        this.currentModel = model;
    }

    startAt(step: JourneyStep) {
        if (!this.assertInitialised()) {
            return;
        }
        if (this.isQuestionnaireCompleted() && this.isQuestionnaireStep(step)) {
            this.logger.event(`Starting journey at self-test`, {
                requestedStep: step,
                details: 'Questionnaire submitted but self-test is not'
            });
            this.goto(SelfTestJourneySteps.CheckYourComputer);
        } else {
            this.goto(step);
        }
    }

    get model(): ParticipantSuitabilityModel {
        return this.currentModel;
    }

    goto(step: JourneyStep) {
        if (this.currentStep !== step) {
            this.redirect.emit(step);
        }
    }

    /**
     * Sets the journey to a specific step. This can be used when navigating to a specific step in the journey.
     * @param position The step to jump to
     */
    jumpTo(position: JourneyStep) {
        if (!this.assertInitialised()) {
            return;
        }

        if (this.isQuestionnaireCompleted() && this.isQuestionnaireStep(position)) {
            const details = { requestedStep: position, details: 'Trying to go to non-self-test step but self-test is pending' };
            this.logger.event(`Redirecting user to self-test`, details);
            this.goto(SelfTestJourneySteps.CheckYourComputer);
        } else {
            this.currentStep = position;
        }
    }

    private isQuestionnaireStep(step: JourneyStep): boolean {
        return ParticipantJourneySteps.GetAll().indexOf(step) >= 0;
    }

    private isQuestionnaireCompleted(): boolean {
        return this.currentModel.isCompleted();
    }

    async submitQuestionnaire(): Promise<void> {
        await this.submitService.submit(this.model);
    }

    /**
     * The journey must know if the user has any upcoming hearings and if the suitability has been answered for these.
     */
    private assertInitialised(): boolean {
        return !!this.model;
    }
}
