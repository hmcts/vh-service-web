import { EventEmitter, Injectable } from '@angular/core';
import { JourneyBase } from '../base-journey/journey-base';
import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { RepresentativeStepsOrderFactory } from './representative-steps-order.factory';
import { RepresentativeJourneySteps } from './representative-journey-steps';
import { JourneyStep } from '../base-journey/journey-step';
import { SubmitService } from './services/submit.service';

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
      && model.clientAttendance !== undefined
      && model.hearingSuitability.answer !== undefined
      && model.room !== undefined
      && model.computer !== undefined;
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
