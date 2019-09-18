import { HearingSelector } from '../base-journey/hearing-selector';
import { Logger } from 'src/app/services/logger';
import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';

@Injectable()
export class RepresentativeJourney extends JourneyBase {
  static readonly initialStep = RepresentativeJourneySteps.AnswersSaved;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  private currentStep: JourneyStep = RepresentativeJourneySteps.NotStarted;
  private currentModel: RepresentativeSuitabilityModel;

  private readonly questionnairePages = [
    RepresentativeJourneySteps.AboutYou,
    RepresentativeJourneySteps.AccessToRoom,
    RepresentativeJourneySteps.AccessToComputer,
    RepresentativeJourneySteps.AboutYourComputer
  ];

  constructor(private submitService: SubmitService, private logger: Logger) {
    super();
    this.redirect.subscribe((step: JourneyStep) => this.currentStep = step);
  }

  get step(): JourneyStep {
    return this.currentStep;
  }

  forSuitabilityAnswers(suitabilityAnswers: RepresentativeSuitabilityModel[]) {
    const isPending = (answers: RepresentativeSuitabilityModel) => !answers.isCompleted();
    const selector = new HearingSelector(isPending, suitabilityAnswers, this.logger);
    if (selector.isDone) {
      this.redirect.emit(RepresentativeJourneySteps.GotoVideoApp);
    } else {
      this.currentModel = selector.selected;
    }
  }

  continueWithModel(model: RepresentativeSuitabilityModel) {
    this.currentModel = model;
  }

  startAt(step: JourneyStep) {
    if (!this.assertInitialised()) {
      return;
    }

    if (this.isQuestionnaireCompleted() && this.isQuestionnaireStep(step)) {
      this.logger.event(`Starting journey at self-test`, { requestedStep: step, details: 'Questionnaire submitted but self-test is not' });
      this.goto(SelfTestJourneySteps.CheckYourComputer);
    } else {
      this.goto(step);
    }
  }

  private isQuestionnaireCompleted(): boolean {
    // if we've dropped out on not having access to a computer or if we've answered the camera question which is the last
    return this.currentModel.computer === false || this.currentModel.camera !== undefined;
  }

  private isQuestionnaireStep(step: JourneyStep): boolean {
    return this.questionnairePages.indexOf(step) >= 0;
  }

  get model(): RepresentativeSuitabilityModel {
    return this.currentModel;
  }

  goto(step: JourneyStep) {
    if (this.currentStep !== step) {
      this.redirect.emit(step);
    }
  }

  async submitQuestionnaire(): Promise<void> {
    await this.submitService.submit(this.model);
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

  /**
   * The journey must know if the user has any upcoming hearings and if the suitability has been answered for these.
   */
  private assertInitialised() {
    return !!(this.model);
  }
}
