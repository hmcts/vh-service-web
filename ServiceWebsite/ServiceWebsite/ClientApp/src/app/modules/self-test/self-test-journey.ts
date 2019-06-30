import {EventEmitter, Injectable} from '@angular/core';
import {JourneyBase} from '../base-journey/journey-base';
import {SelfTestModel} from './self-test.model';
import {IndividualStepsOrderFactory} from './individual-steps-order.factory';
import {SelfTestJourneySteps} from './self-test-journey-steps';
import {JourneyStep} from '../base-journey/journey-step';
import {SubmitService} from './services/submit.service';
import {MutableIndividualSuitabilityModel} from './mutable-individual-suitability.model';

@Injectable()
export class SelfTestJourney extends JourneyBase {
  static readonly initialStep = SelfTestJourneySteps.AboutHearings;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  stepOrder: Array<JourneyStep>;
  private currentStep: JourneyStep = SelfTestJourneySteps.First;
  private currentModel: SelfTestModel;
  private isDone: boolean;
  private isSubmitted: boolean;

  constructor(private individualStepsOrderFactory: IndividualStepsOrderFactory,
              private submitService: SubmitService) {
    super();
    this.redirect.subscribe((step: JourneyStep) => {
      this.currentStep = step;
    });
    this.stepOrder = this.individualStepsOrderFactory.stepOrder();
  }

  get step(): SelfTestJourneySteps {
    return this.currentStep;
  }

  forSuitabilityAnswers(suitabilityAnswers: SelfTestModel[]) {
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
      this.goto(SelfTestJourneySteps.GotoVideoApp);
    } else {
      this.goto(step);
    }
  }

  get model(): SelfTestModel {
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

    if (this.isSubmitted) {
      this.goto(SelfTestJourneySteps.ThankYou);
      return;
    }

    let nextStep = this.stepOrder[currentStep + 1];

    if (this.submitService.isDropOffPoint(this.model)) {
      // update the model to set the answers in case browserback was clicked and the answers were changed.
      let saveModel: MutableIndividualSuitabilityModel;
      saveModel = this.submitService.updateSubmitModel(this.currentStep, this.model);
      // save the updated model.
      this.submitService.submit(saveModel);
      this.isSubmitted = true;
      nextStep = SelfTestJourneySteps.ThankYou;
    }

    this.goto(nextStep);
  }

  fail() {
    const dropoutToThankYouFrom = [
      SelfTestJourneySteps.AccessToComputer,
      SelfTestJourneySteps.AboutYourComputer,
      SelfTestJourneySteps.YourInternetConnection,
      SelfTestJourneySteps.Consent
    ];

    if (dropoutToThankYouFrom.includes(this.currentStep)) {
      this.goto(SelfTestJourneySteps.ThankYou);
    } else if (this.currentStep === SelfTestJourneySteps.AccessToCameraAndMicrophone) {
      this.goto(SelfTestJourneySteps.MediaAccessError);
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
      this.goto(SelfTestJourneySteps.GotoVideoApp);
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
    if (this.currentStep === SelfTestJourneySteps.NotStarted) {
      throw new Error('Journey must be entered before navigation is allowed');
    }
  }
}
