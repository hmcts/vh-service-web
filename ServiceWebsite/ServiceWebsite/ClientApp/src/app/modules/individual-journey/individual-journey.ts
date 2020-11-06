import { HearingSelector } from '../base-journey/hearing-selector';
import { IndividualSuitabilityModel } from 'src/app/modules/individual-journey/individual-suitability.model';
import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualJourneySteps } from './individual-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';
import { Logger } from 'src/app/services/logger';

@Injectable()
export class IndividualJourney extends JourneyBase {
    readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
    private currentStep: JourneyStep = IndividualJourneySteps.NotStarted;
    private currentModel: IndividualSuitabilityModel;
    journeyName = 'Individual';

    constructor(private submitService: SubmitService, private logger: Logger) {
        super();
        this.redirect.subscribe((step: JourneyStep) => {
            this.logger.event(`telemetry:serviceweb:individual:step:${step}`);
            this.currentStep = step;
        });
    }

    get step(): IndividualJourneySteps {
        return this.currentStep;
    }

    forSuitabilityAnswers(suitabilityAnswers: IndividualSuitabilityModel[]) {
        const isPending = (answers: IndividualSuitabilityModel) => !answers.isCompleted();
        const selector = new HearingSelector(isPending, suitabilityAnswers, this.logger);
        if (selector.isDone) {
            this.redirect.emit(IndividualJourneySteps.GotoVideoApp);
        } else {
            this.currentModel = selector.selected;
        }
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

    get model(): IndividualSuitabilityModel {
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
        return IndividualJourneySteps.GetAll().indexOf(step) >= 0;
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
