import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';
import { SelfTestJourneySteps } from '../self-test-journey/self-test-journey-steps';
import { HasAccessToCamera } from '../base-journey/participant-suitability.model';

@Injectable()
export class RepresentativeJourney extends JourneyBase {
  static readonly initialStep = RepresentativeJourneySteps.AboutVideoHearings;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  stepOrder: Array<JourneyStep>;
  private currentStep: JourneyStep = RepresentativeJourneySteps.NotStarted;
  private currentModel: RepresentativeSuitabilityModel;
  private isDone: boolean;

  constructor(private stepsFactory: RepresentativeStepsOrderFactory, private submitService: SubmitService) {
    super();
    this.redirect.subscribe((step: JourneyStep) => this.currentStep = step);
    this.stepOrder = this.stepsFactory.stepOrder();
  }

  get step(): JourneyStep {
    return this.currentStep;
  }

  forSuitabilityAnswers(suitabilityAnswers: RepresentativeSuitabilityModel[]) {
    const upcoming = suitabilityAnswers.filter(hearing => hearing.isUpcoming());
    if (upcoming.length === 0) {
      this.isDone = true;
      return;
    }

    const pending = upcoming.filter(u => u.selfTest !== undefined && !u.selfTest.isCompleted());
    if (pending.length === 0) {
      this.isDone = true;
      return;
    }

    // sort upcoming on date and pick the earliest
    pending.sort((u1, u2) => u1.hearing.scheduleDateTime.getTime() - u2.hearing.scheduleDateTime.getTime());
    this.currentModel = pending[0];
  }

  startAt(step: JourneyStep) {
    this.assertInitialised();
    if (this.isDone) {
      this.goto(RepresentativeJourneySteps.GotoVideoApp);
    } else if (this.isQuestionnaireCompleted() && !this.isSelfTestStep(step)) {
      this.goto(SelfTestJourneySteps.SameComputer);
    } else {
      this.goto(step);
    }
  }

  private isQuestionnaireCompleted(): boolean {
    return this.currentModel.computer !== undefined
      || (this.currentModel.camera === HasAccessToCamera.NotSure || this.currentModel.camera === HasAccessToCamera.Yes);
  }

  private isSelfTestStep(step: JourneyStep): boolean {
    // Include thank you as it comes straight after self-test
    return step === RepresentativeJourneySteps.ThankYou || SelfTestJourneySteps.GetAll().indexOf(step) !== -1;
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
    this.assertInitialised();
    if (this.isDone) {
      this.goto(RepresentativeJourneySteps.GotoVideoApp);
    } else if (this.isQuestionnaireCompleted() && !this.isSelfTestStep(position)) {
      this.goto(SelfTestJourneySteps.SameComputer);
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
}
