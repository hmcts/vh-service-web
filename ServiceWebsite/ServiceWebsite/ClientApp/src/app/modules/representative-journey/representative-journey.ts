import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { HasAccessToCamera } from '../base-journey/participant-suitability.model';
import { JourneyStep } from '../base-journey/journey-step';

@Injectable()
export class RepresentativeJourney implements JourneyBase {
  static readonly initialStep = RepresentativeJourneySteps.AboutVideoHearings;

  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();

  stepOrder: Array<JourneyStep>;

  private currentStep: JourneyStep = RepresentativeJourneySteps.NotStarted; h;

  private currentModel: RepresentativeSuitabilityModel;

  private isDone: boolean;
  private isSelfTestDone: boolean;

  constructor(private stepsFactory: RepresentativeStepsOrderFactory) {
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

  startAt(step: JourneyStep) {
    this.assertInitialised();
    if (this.isDone) {
      this.goto(RepresentativeJourneySteps.GotoVideoApp);
    } else {
      this.goto(step);
    }
  }

  get model(): RepresentativeSuitabilityModel {
    return this.currentModel;
  }

  private isSuitabilityAnswersComplete(model: RepresentativeSuitabilityModel): boolean {
    return model.aboutYou.answer !== undefined
      && model.aboutYourClient.answer !== undefined
      && model.clientAttenance !== undefined
      && model.hearingSuitability.answer !== undefined
      && model.room !== undefined
      && model.computer !== undefined
      && model.camera !== undefined;
  }

  private goto(step: JourneyStep) {
    if (this.currentStep !== step) {
      this.redirect.emit(step);
    }
  }

  next() {
    this.assertInitialised();
    this.assertEntered();

    const currentStep = this.stepOrder.indexOf(this.currentStep);
    if (currentStep < 0 || currentStep === this.stepOrder.length - 1) {
      throw new Error('Missing transition for step: ' + this.currentStep);
    }

    let nextStep = this.stepOrder[currentStep + 1];

    // incase of 'no' response for access to computer and camera navigate to questionnaire completed, contact us
    // access to a computer.
    if (this.model.computer === false) {
      if (this.currentStep === RepresentativeJourneySteps.QuestionnaireCompleted){
        nextStep = RepresentativeJourneySteps.ContactUs;
      } else {
        nextStep = RepresentativeJourneySteps.QuestionnaireCompleted;
      }
    }
    // access to a camera and microphone.
    if (this.model.camera === HasAccessToCamera.No) {
      if (this.currentStep === RepresentativeJourneySteps.QuestionnaireCompleted){
        nextStep = RepresentativeJourneySteps.ContactUs;
      } else {
        nextStep = RepresentativeJourneySteps.QuestionnaireCompleted;
      }
    }
    this.goto(nextStep);
  }

  fail() {
    const dropoutToQuestionnaireCompletedFrom = [
      RepresentativeJourneySteps.AccessToComputer,
      RepresentativeJourneySteps.AboutYourComputer,
    ];

    const dropoutToContactUsFrom = [
      RepresentativeJourneySteps.QuestionnaireCompleted
    ];

    if (dropoutToQuestionnaireCompletedFrom.includes(this.currentStep)) {
      this.goto(RepresentativeJourneySteps.QuestionnaireCompleted);
    } else {
      throw new Error(`Missing/unexpected failure for step: ${this.currentStep}`);
    }
  }

  /**
   * Sets the journey to a specific step. This can be used when navigating to a specific step in the journey.
   * @param position The step to jump to
   */
  jumpTo(position: JourneyStep) {
    this.assertInitialised();
    if (this.isDone) {
      this.goto(RepresentativeJourneySteps.GotoVideoApp);
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
    if (this.currentStep === RepresentativeJourneySteps.NotStarted) {
      throw new Error('Journey must be entered before navigation is allowed');
    }
  }
}
