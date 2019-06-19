import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { IndividualSuitabilityModel } from './individual-suitability.model';
import { IndividualStepsOrderFactory } from './individual-steps-order.factory';
import { IndividualJourneySteps } from './individual-journey-steps';
import { HasAccessToCamera, SuitabilityAnswer } from '../base-journey/participant-suitability.model';
import { JourneyStep } from '../base-journey/journey-step';
import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';
import { SuitabilityService } from './services/suitability.service';
import { IndividualModelMapper } from './services/individual-model-mapper';
import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';

@Injectable()
export class IndividualJourney extends JourneyBase {
  static readonly initialStep = IndividualJourneySteps.AboutHearings;

  readonly redirect: EventEmitter<JourneyStep> = new EventEmitter();

  stepOrder: Array<JourneyStep>;

  private currentStep: JourneyStep = IndividualJourneySteps.NotStarted;

  private currentModel: IndividualSuitabilityModel;

  private isDone: boolean;
  private isSubmitted: boolean;

  private stepsWithAnswers: Array<MutableIndividualSuitabilityModelWithStep> = [];

  constructor(private individualStepsOrderFactory: IndividualStepsOrderFactory, private suitabilityService: SuitabilityService) {
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
    this.updateSubmitModelWithStep(currentStep);

    // access to a computer.
    if (this.model.computer === false) {
      const modelToSave = this.stepsWithAnswers.find(m => m.step === currentStep);
      modelToSave.model.computer = false;
      this.submit(modelToSave.model);
      nextStep = IndividualJourneySteps.ThankYou;
    }
    // access to a camera and microphone.
    if (this.model.camera === HasAccessToCamera.No) {
      const modelToSave = this.stepsWithAnswers.find(m => m.step === currentStep);
      modelToSave.model.camera = HasAccessToCamera.No;
      this.submit(modelToSave.model);
      nextStep = IndividualJourneySteps.ThankYou;
    }
    // access to the internet.
    if (this.model.internet === false) {
      const modelToSave = this.stepsWithAnswers.find(m => m.step === currentStep);
      modelToSave.model.internet = false;
      this.submit(modelToSave.model);
      nextStep = IndividualJourneySteps.ThankYou;
    }
    // consent.
    if (this.model.consent.answer === true || this.model.consent.answer === false) {
      const modelToSave = this.stepsWithAnswers.find(m => m.step === currentStep);
      this.submit(modelToSave.model);
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

  private async submit(model: MutableIndividualSuitabilityModel) {
    console.log(model);
    const mapper = new IndividualModelMapper();
    let answers: HearingSuitabilityAnswer[];
    answers = mapper.mapToRequest(model);
    await this.suitabilityService.updateSuitabilityAnswers(this.model.hearing.id, answers);
    this.isSubmitted = true;
  }

  private updateSubmitModelWithStep(step: number): void {

    // do not add again if the step already exists in the array.
    const stepExists = this.stepsWithAnswers.find(m => m.step === step);
    if (stepExists !== null) return;

    const currentStepWithAnswer = new MutableIndividualSuitabilityModelWithStep();

    currentStepWithAnswer.step = step;
    currentStepWithAnswer.model = new MutableIndividualSuitabilityModel();
    currentStepWithAnswer.model.aboutYou = this.model.aboutYou !== undefined ? this.model.aboutYou : new SuitabilityAnswer();
    currentStepWithAnswer.model.camera = this.model.camera !== undefined ? this.model.camera : undefined;
    currentStepWithAnswer.model.computer = this.model.computer !== undefined ? this.model.computer : undefined;
    currentStepWithAnswer.model.consent = this.model.consent !== undefined ? this.model.consent : new SuitabilityAnswer();
    currentStepWithAnswer.model.internet = this.model.internet !== undefined ? this.model.internet : undefined;
    currentStepWithAnswer.model.interpreter = this.model.interpreter !== undefined ? this.model.interpreter : undefined;
    currentStepWithAnswer.model.room = this.model.room !== undefined ? this.model.room : undefined;

    this.stepsWithAnswers.push(currentStepWithAnswer);
    console.log(this.stepsWithAnswers);
  }
}

export class MutableIndividualSuitabilityModelWithStep {
  step: number;
  model: MutableIndividualSuitabilityModel;
}
