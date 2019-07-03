import {EventEmitter, Injectable} from '@angular/core';
import {SelfTestStepsOrderFactory} from './self-test-steps-order.factory';
import {SelfTestJourneySteps} from './self-test-journey-steps';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantSuitabilityModel} from '../base-journey/participant-suitability.model';

@Injectable()
export class SelfTestJourney {
  static readonly initialStep = SelfTestJourneySteps.SameComputer;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  stepOrder: Array<JourneyStep>;
  private currentStep: JourneyStep = SelfTestJourneySteps.NotStarted;
  private currentModel: ParticipantSuitabilityModel;
  private isSubmitted: boolean;

  constructor(participantModel: ParticipantSuitabilityModel, private stepsFactory: SelfTestStepsOrderFactory) {
    this.redirect.subscribe((step: JourneyStep) => {
      this.currentStep = step;
    });
    this.stepOrder = this.stepsFactory.stepOrder();
    this.currentModel = participantModel;
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
    if  (currentStep < 0) {
      throw new Error(`Current step '${this.currentStep}' is not part of the self test`);
    }
    if (currentStep === this.stepOrder.length - 1) {
      throw new Error(`Cannot proceed past last step '${this.stepOrder[this.stepOrder.length - 1]}'`);
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
    if (this.isDone()) {
      this.goto(SelfTestJourneySteps.GotoVideoApp);
    } else {
      this.currentStep = position;
    }
  }

  startAt(step: JourneyStep): void {
    if (this.isDone()) {
      this.goto(SelfTestJourneySteps.GotoVideoApp);
      return;
    }
    this.goto(step);
  }

  isDone(): boolean {
    if (!this.model.selfTest) {
      return false;
    }
    const selfTest = this.model.selfTest;
    return selfTest.cameraWorking === true
      && selfTest.microphoneWorking === true
      && selfTest.sameComputer === true
      && selfTest.seeAndHearClearly === true;
  }
}
