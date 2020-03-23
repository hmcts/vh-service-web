import { Component, OnInit, OnDestroy } from '@angular/core';
import { PresentingTheCase, PresentingCaseDetails } from '../../representative-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { FormControl, Validators } from '@angular/forms';
import { Constants } from '../../../shared/constants';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presenting-the-case',
  templateUrl: './presenting-the-case.component.html',
  styles: []
})
export class PresentingTheCaseComponent extends SuitabilityChoicePageBaseComponent implements OnInit, OnDestroy {

  presentingTheCase = PresentingTheCase;
  showPresenterDetails = false;
  readonly presentingCaseName = new FormControl('');
  readonly presentingCaseEmail = new FormControl('');
  isValidEmail = true;
  mode: string;
  $routerSubcription: Subscription;
  $choiceSubcription: Subscription;

  constructor(journey: RepresentativeJourney, private route: ActivatedRoute) {
    super(journey);
    this.$routerSubcription = this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (this.model.presentingTheCase !== undefined &&
      this.model.presentingTheCase !== null) {
      this.choice.setValue(this.model.presentingTheCase);
      this.showPresenterDetails = this.model.presentingTheCase === this.presentingTheCase.SomeoneWillBePresenting;
      if (this.showPresenterDetails && this.model.presentingCaseDetails) {
        this.initFormWithValues();
      }
    }

    this.$choiceSubcription = this.choice.valueChanges.subscribe(value => {
      this.toggelPresenterCaseDetails(value);
    });
  }

  toggelPresenterCaseDetails(value) {
    this.showPresenterDetails = value === this.presentingTheCase.SomeoneWillBePresenting;
    if (!this.showPresenterDetails) {
      this.clearPresentingCaseDetails();
    }
  }

  private initForm() {
    this.setValidationForPresenterDetails();
    this.form.addControl('presentingCaseName', this.presentingCaseName);
    this.form.addControl('presentingCaseEmail', this.presentingCaseEmail);
    this.clearPresentingCaseDetails();
  }

  get presentingCaseNameInvalid() {
    return this.presentingCaseName.invalid && (this.presentingCaseName.dirty || this.presentingCaseName.touched);
  }

  private initFormWithValues() {
    this.presentingCaseName.setValue(this.model.presentingCaseDetails.fullName);
    this.presentingCaseEmail.setValue(this.model.presentingCaseDetails.email);
  }

  private clearPresentingCaseDetails() {
    this.presentingCaseName.setValue('');
    this.presentingCaseEmail.setValue('');
  }

  private setValidationForPresenterDetails() {
    this.presentingCaseName.setValidators([Validators.pattern(Constants.TextInputPatternName), Validators.maxLength(255)]);
    this.presentingCaseName.updateValueAndValidity();
  }

  protected bindModel(): void {
    this.model.presentingTheCase = this.choice.value;
    this.model.presentingCaseDetails = new PresentingCaseDetails();
    this.model.presentingCaseDetails.fullName = this.presentingCaseName.value;
    this.model.presentingCaseDetails.email = this.presentingCaseEmail.value;
  }

  validateEmail() {
    /* tslint:disable: max-line-length */
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.isValidEmail = this.presentingCaseEmail && this.presentingCaseEmail.value.length > 0 && pattern.test(this.presentingCaseEmail.value.toLowerCase());
  }

  blurEmail() {
    if (this.presentingCaseEmail.touched
      && this.presentingCaseEmail.value.length > 0) {
      this.validateEmail();
    } else {
      this.isValidEmail = true;
    }
  }

  async submit(): Promise<void> {
    if (this.isValidEmail && this.trySubmit()) {
      console.log(this.mode);
      if (this.mode !== undefined && this.mode === 'Edit') {
        this.journey.goto(RepresentativeJourneySteps.CheckYourAnswers);
      } else {
        this.journey.goto(RepresentativeJourneySteps.OtherInformation);

      }

    }
  }

  ngOnDestroy() {
    if (this.$choiceSubcription) {
      this.$choiceSubcription.unsubscribe();
    }
    if (this.$routerSubcription) {
      this.$routerSubcription.unsubscribe();
    }
  }
}
