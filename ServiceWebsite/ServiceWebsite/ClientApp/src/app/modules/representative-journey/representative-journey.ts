import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { HasAccessToCamera } from '../base-journey/participant-suitability.model';

@Injectable()
export class RepresentativeJourney implements JourneyBase {
  static readonly initialStep = RepresentativeJourneySteps.AboutVideoHearings;

  readonly redirect: EventEmitter<RepresentativeJourneySteps> = new EventEmitter();

  stepOrder: Array<RepresentativeJourneySteps>;

  private currentStep: RepresentativeJourneySteps = RepresentativeJourneySteps.NotStarted;

  private currentModel: RepresentativeSuitabilityModel;

  private isDone: boolean;

  constructor(private stepsFactory: RepresentativeStepsOrderFactory) {
    this.redirect.subscribe((step: RepresentativeJourneySteps) => this.currentStep = step);
    this.stepOrder = this.stepsFactory.stepOrder();
  }

  get step(): RepresentativeJourneySteps {
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

  startAt(step: RepresentativeJourneySteps) {
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

  private goto(step: RepresentativeJourneySteps) {
    if (this.currentStep !== step) {
      this.redirect.emit(step);
    }
  }

  next() {
    this.assertInitialised();
    this.assertEntered();

    const currentStep = this.stepOrder.indexOf(this.currentStep);
    if (currentStep < 0 || currentStep === this.stepOrder.length - 1) {
      throw new Error('Missing transition for step: ' + RepresentativeJourneySteps[this.currentStep]);
    }

    let nextStep = this.stepOrder[currentStep + 1];

    // access to a computer.
    if (this.model.computer === false) {
      nextStep = RepresentativeJourneySteps.QuestionnaireCompleted;
    }
    // access to a camera and microphone.
    if (this.model.camera === HasAccessToCamera.No) {
      nextStep = RepresentativeJourneySteps.QuestionnaireCompleted;
    }
    this.goto(nextStep);
  }

  fail() {
    const dropoutToThankYouFrom = [
      RepresentativeJourneySteps.AccessToComputer,
      RepresentativeJourneySteps.AboutYourComputer,
    ];

    if (dropoutToThankYouFrom.includes(this.currentStep)) {
      this.goto(RepresentativeJourneySteps.QuestionnaireCompleted);
    } else {
      throw new Error(`Missing/unexpected failure for step: ${RepresentativeJourneySteps[this.currentStep]}`);
    }
  }

  /**
   * Sets the journey to a specific step. This can be used when navigating to a specific step in the journey.
   * @param position The step to jump to
   */
  jumpTo(position: RepresentativeJourneySteps) {
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
