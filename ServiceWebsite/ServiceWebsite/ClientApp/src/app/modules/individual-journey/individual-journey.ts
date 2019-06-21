import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualSuitabilityModel } from './individual-suitability.model';
import { IndividualStepsOrderFactory } from './individual-steps-order.factory';
import { IndividualJourneySteps } from './individual-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';

@Injectable()
export class IndividualJourney extends JourneyBase {
  static readonly initialStep = IndividualJourneySteps.AboutHearings;

  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();

  stepOrder: Array<JourneyStep>;

  private currentStep: JourneyStep = IndividualJourneySteps.NotStarted;

  private currentModel: IndividualSuitabilityModel;

  private isDone: boolean;

  constructor(private individualStepsOrderFactory: IndividualStepsOrderFactory,
    private submitService: SubmitService) {
    super();
    this.redirect.subscribe((step: JourneyStep) => this.currentStep = step);
    this.stepOrder = this.individualStepsOrderFactory.stepOrder();
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

    // sort upcoming on date and pick the earliest
    upcoming.sort((u1, u2) => u1.hearing.scheduleDateTime.getTime() - u2.hearing.scheduleDateTime.getTime());
    this.currentModel = upcoming[0];
  }

  startAt(step: JourneyStep) {
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

    if (this.submitService.isDropOffPoint(currentStep, this.model)) {
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
