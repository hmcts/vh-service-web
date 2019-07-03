import { ParticipantJourneySteps } from './../base-journey/participant-journey-steps';
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
  private currentStep: JourneyStep = ParticipantJourneySteps.NotStarted;
  private currentModel: ParticipantSuitabilityModel;
  readonly submit: EventEmitter<ParticipantSuitabilityModel> = new EventEmitter();

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

    if (this.isLastStep(currentStep)) {
      // do submission
      this.submit.emit(this.model);
      this.goto(ParticipantJourneySteps.ThankYou);
      return;
    }

    if (this.notOnSameDevice()) {
      this.goto(SelfTestJourneySteps.SignInOtherComputer);
      return;
    }

    const nextStep = this.stepOrder[currentStep + 1];

    this.goto(nextStep);
  }

  private isLastStep(index: number): boolean {
    return index === this.stepOrder.length - 1;
  }

  private notOnSameDevice(): boolean {
    return this.model.selfTest.sameComputer === false;
  }

  jumpTo(position: JourneyStep) {
    if (this.isDone()) {
      this.goto(ParticipantJourneySteps.GotoVideoApp);
    } else {
      this.currentStep = position;
    }
  }

  startAt(step: JourneyStep): void {
    if (this.isDone()) {
      this.goto(ParticipantJourneySteps.GotoVideoApp);
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
