import { HearingSelector } from './../base-journey/hearing-selector';
import { IndividualSuitabilityModel } from 'src/app/modules/individual-journey/individual-suitability.model';
import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualStepsOrderFactory } from './individual-steps-order.factory';
import { IndividualJourneySteps } from './individual-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';
import { Logger } from 'src/app/services/logger';

@Injectable()
export class IndividualJourney extends JourneyBase {
  static readonly initialStep = IndividualJourneySteps.AboutHearings;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  stepOrder: Array<JourneyStep>;
  private currentStep: JourneyStep = IndividualJourneySteps.NotStarted;
  private currentModel: IndividualSuitabilityModel;
  private isDone: boolean;

  constructor(private individualStepsOrderFactory: IndividualStepsOrderFactory,
    private submitService: SubmitService,
    private logger: Logger) {
    super();
    this.redirect.subscribe((step: JourneyStep) => {
      this.currentStep = step;
    });
    this.stepOrder = this.individualStepsOrderFactory.stepOrder();
  }

  get step(): IndividualJourneySteps {
    return this.currentStep;
  }

  forSuitabilityAnswers(suitabilityAnswers: IndividualSuitabilityModel[]) {
    const isPending = (model: IndividualSuitabilityModel) => model.selfTest === undefined || !model.selfTest.isCompleted();
    const selector = new HearingSelector(isPending, suitabilityAnswers, this.logger);
    this.isDone = selector.isDone;
    this.currentModel = selector.selected;
  }

  startAt(step: JourneyStep) {
    this.assertInitialised();
    if (this.isDone) {
      this.goto(IndividualJourneySteps.GotoVideoApp);
    } else if (this.isQuestionnaireCompleted() && !this.isSelfTestStep(step)) {
      this.logger.event(`Starting journey at self-test`, { requestedStep: step, details: 'Questionnaire submitted but self-test is not' });
      this.goto(SelfTestJourneySteps.SameComputer);
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
    this.assertInitialised();
    if (this.isDone) {
      this.goto(IndividualJourneySteps.GotoVideoApp);
    } else if (this.isQuestionnaireCompleted() && !this.isSelfTestStep(position)) {
      const details = { requestedStep: position, details: 'Trying to go to non-self-test step but self-test is pending' };
      this.logger.event(`Redirecting user to self-test`, details);
      this.goto(SelfTestJourneySteps.SameComputer);
    } else {
      this.currentStep = position;
    }
  }

  private isSelfTestStep(step: JourneyStep): boolean {
    // Include thank you as it comes straight after self-test
    return step === IndividualJourneySteps.ThankYou || SelfTestJourneySteps.GetAll().indexOf(step) !== -1;
  }

  private isQuestionnaireCompleted(): boolean {
    return this.currentModel.consent.answer !== undefined;
  }

  async submitQuestionnaire(): Promise<void> {
    let saveModel: MutableIndividualSuitabilityModel;
    saveModel = this.submitService.updateSubmitModel(this.currentStep, this.model);
    await this.submitService.submit(saveModel);
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
}
