import {EventEmitter, Injectable} from '@angular/core';
import {JourneyBase} from '../base-journey/journey-base';
import {SelfTestStepsOrderFactory} from './self-test-steps-order.factory';
import {SelfTestJourneySteps} from './self-test-journey-steps';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantSuitabilityModel} from '../base-journey/participant-suitability.model';

@Injectable()
export class SelfTestJourney extends JourneyBase {
  static readonly initialStep = SelfTestJourneySteps.SameComputer;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  stepOrder: Array<JourneyStep>;
  private currentStep: JourneyStep = SelfTestJourneySteps.NotStarted;
  private currentModel: ParticipantSuitabilityModel;
  private isDone: boolean;
  private isSubmitted: boolean;

  constructor(private individualStepsOrderFactory: SelfTestStepsOrderFactory) {
    super();
    this.redirect.subscribe((step: JourneyStep) => {
      this.currentStep = step;
    });
    this.stepOrder = this.individualStepsOrderFactory.stepOrder();
  }

  get step(): SelfTestJourneySteps {
    return this.currentStep;
  }

  get model(): ParticipantSuitabilityModel {
    return this.currentModel;
  }

  private goto(step: JourneyStep) {
    if (this.currentStep !== step) {
      this.redirect.emit(step);
    }
  }

  next() {
    const currentStep = this.stepOrder.indexOf(this.currentStep);
    if (currentStep < 0 || currentStep === this.stepOrder.length - 1) {
      throw new Error('Missing transition for step: ' + this.currentStep);
    }

    if (this.isSubmitted) {
      this.goto(SelfTestJourneySteps.ThankYou);
      return;
    }

    const nextStep = this.stepOrder[currentStep + 1];

    this.goto(nextStep);
  }

  fail() {
    const dropoutToThankYouFrom = [
      SelfTestJourneySteps.SameComputer
    ];

    const dropoutToSignInOtherComputer = [
      SelfTestJourneySteps.SameComputer
    ];

    if (dropoutToThankYouFrom.includes(this.currentStep)) {
      this.goto(SelfTestJourneySteps.ThankYou);
    } else if (dropoutToSignInOtherComputer.includes(this.currentStep)) {
      this.goto(SelfTestJourneySteps.SignInOtherComputer);
    } else {
      throw new Error(`Missing/unexpected failure for step: ${this.currentStep}`);
    }
  }

  jumpTo(position: JourneyStep) {
    if (this.isDone) {
      this.goto(SelfTestJourneySteps.GotoVideoApp);
    } else {
      this.currentStep = position;
    }
  }

  startAt(step: JourneyStep): void {
    this.goto(step);
  }
}
