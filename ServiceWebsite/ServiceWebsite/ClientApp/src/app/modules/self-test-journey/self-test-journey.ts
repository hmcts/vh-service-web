import { ParticipantJourneySteps } from '../base-journey/participant-journey-steps';
import {EventEmitter, Injectable} from '@angular/core';
import {SelfTestJourneySteps} from './self-test-journey-steps';
import {JourneyStep} from '../base-journey/journey-step';
import {ParticipantSuitabilityModel} from '../base-journey/participant-suitability.model';

@Injectable()
export class SelfTestJourney {
  static readonly initialStep = SelfTestJourneySteps.CheckYourComputer;
  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();
  private currentStep: JourneyStep = ParticipantJourneySteps.NotStarted;
  private readonly currentModel: ParticipantSuitabilityModel;
  readonly submit: EventEmitter<ParticipantSuitabilityModel> = new EventEmitter();

  constructor(participantModel: ParticipantSuitabilityModel) {
    this.redirect.subscribe((step: JourneyStep) => {
      this.currentStep = step;
    });
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
    const selfTest = this.model.selfTest;
    return selfTest.cameraWorking === true
      && selfTest.microphoneWorking === true
      && selfTest.checkYourComputer === true
      && selfTest.seeAndHearClearly === true;
  }
}
