import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormControlName, Validators} from '@angular/forms';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { ValidateForWhiteSpace } from '../../../shared/validators/whitespace-validator';
import { IndividualJourney } from '../../individual-journey';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';
import {Logger} from '../../../../services/logger';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { Subscription } from 'rxjs';

const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
  const result = originFormControlNameNgOnChanges.apply(this, arguments);
  this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
  return result;
};

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html'
})

export class ConsentComponent extends SuitabilityChoicePageBaseComponent implements OnInit, OnDestroy {

  readonly textInputNo = new FormControl('');
  noSelected = false;
  $choiceSubcription: Subscription;

  constructor(journey: IndividualJourney, private logger: Logger) {
    super(journey);
  }

  ngOnInit() {
    this.form.addControl('textInputNo', this.textInputNo);
    this.choice.setValue(this.model.consent.answer);
    if (this.model.consent.answer === false) {
      this.textInputNo.setValue(this.model.consent.notes);
    }

    this.$choiceSubcription = this.choice.valueChanges.subscribe(value => {
      if (value) {
        this.optionYes();
      } else {
        this.optionNo();
      }

      // calling these will update the forms validity based on the changed validations
      this.textInputNo.updateValueAndValidity();
      this.form.updateValueAndValidity();

      // if we've tried submitting without and answer select an answer that has another required field
      // we want to treat this as "a new form", the user hasn't seen these fields so we need to treat the
      // form as pristine until the next time the user has tried to submit, this reduces flickering of the
      // error messages as the user focuses/blurs and enters text
      this.submitted = false;
    });
  }

  private optionYes() {
    this.noSelected = false;
    this.textInputNo.clearValidators();
    this.textInputNo.disable();
    this.textInputNo.setValue('');
  }

  private optionNo() {
    this.textInputNo.setValidators([Validators.required, ValidateForWhiteSpace]);
    this.textInputNo.markAsUntouched();
    this.textInputNo.enable();
    this.noSelected = true;
  }

  get isTextInputNoInvalid(): boolean {
    return this.textInputNo.invalid && this.submitted;
  }

  protected bindModel(): void {
    this.model.consent.answer = this.choice.value;
    this.model.consent.notes = this.choice.value ? null : this.textInputNo.value;
  }

  async submit(): Promise<void> {
    const textInputElement = (<any>this.textInputNo).nativeElement;
    if (textInputElement) {
      textInputElement.focus();
    }

    if (this.trySubmit()) {
      await this.journey.submitQuestionnaire();
        this.logger.event('telemetry:serviceweb:any:questionnaire:complete');
        this.journey.goto(IndividualJourneySteps.AnswersSaved);
    }
  }

  ngOnDestroy() {
    if (this.$choiceSubcription) {
      this.$choiceSubcription.unsubscribe();
    }
  }
}
