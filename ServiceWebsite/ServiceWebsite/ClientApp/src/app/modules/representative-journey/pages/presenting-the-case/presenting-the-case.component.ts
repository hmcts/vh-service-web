import { Component, OnInit } from '@angular/core';
import { PresentingTheCase, PresentingCaseDetails } from '../../representative-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-presenting-the-case',
    templateUrl: './presenting-the-case.component.html',
    styles: []
})
export class PresentingTheCaseComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

    presentingTheCase = PresentingTheCase;
    showPresenterDetails = false;
    readonly presentingCaseName = new FormControl('');
    readonly presentingCaseEmail = new FormControl('');
    isValidEmail = true;

    constructor(journey: RepresentativeJourney) {
        super(journey);
    }

    ngOnInit(): void {
        this.initForm();
        if (this.model.presentingTheCase !== undefined && this.model.presentingTheCase !== null) {
            this.choice.setValue(this.model.presentingTheCase);
            this.showPresenterDetails = this.model.presentingTheCase === this.presentingTheCase.SomeoneWillBePresenting;
            if (this.showPresenterDetails && this.model.presentingCaseDetails) {
                this.initFormWithValues();
            }
        }

        this.choice.valueChanges.subscribe(value => {
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
        this.form.addControl('presentingCaseName', this.presentingCaseName);
        this.form.addControl('presentingCaseEmail', this.presentingCaseEmail);
        this.clearPresentingCaseDetails();
    }

    private initFormWithValues() {
        this.presentingCaseName.setValue(this.model.presentingCaseDetails.fullName);
        this.presentingCaseEmail.setValue(this.model.presentingCaseDetails.email);
    }

    private clearPresentingCaseDetails() {
        this.presentingCaseName.setValue('');
        this.presentingCaseEmail.setValue('');
    }

    protected bindModel(): void {
        this.model.presentingTheCase = this.choice.value;
        this.model.presentingCaseDetails = new PresentingCaseDetails();
        this.model.presentingCaseDetails.fullName = this.presentingCaseName.value;
        this.model.presentingCaseDetails.email = this.presentingCaseEmail.value;
    }

    validateEmail() {
        /* tslint:disable: max-line-length */
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            this.journey.goto(RepresentativeJourneySteps.OtherInformation);
        }
    }
}
