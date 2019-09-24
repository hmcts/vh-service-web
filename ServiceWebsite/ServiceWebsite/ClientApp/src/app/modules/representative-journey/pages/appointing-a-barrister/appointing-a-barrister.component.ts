import { Component, OnInit } from '@angular/core';
import { AppointingBarrister, AppointingBarristerDetails } from '../../representative-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-appointing-a-barrister',
  templateUrl: './appointing-a-barrister.component.html',
  styles: []
})
export class AppointingABarristerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  appointingBarrister = AppointingBarrister;
  showBarristerDetails = false;
  readonly barristerName = new FormControl('');
  readonly barristerChambers = new FormControl('');
  readonly barristerEmail = new FormControl('');
  isValidEmail = true;

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.model.appointingBarrister !== undefined && this.model.appointingBarrister !== null) {
      this.choice.setValue(this.model.appointingBarrister);
      this.showBarristerDetails = this.model.appointingBarrister === this.appointingBarrister.BarristerWillBeAppointed;
      if (this.showBarristerDetails && this.model.appointingBarristerDetails) {
        this.initFormWithValues();
      }
    }

    this.choice.valueChanges.subscribe(value => {
      this.toggelBarristerDetails(value);
    });
  }

  toggelBarristerDetails(value) {
    this.showBarristerDetails = value === this.appointingBarrister.BarristerWillBeAppointed;
    if (!this.showBarristerDetails) {
      this.clearBarristerDetails();
    }
  }

  private initForm() {
    this.form.addControl('barristerName', this.barristerName);
    this.form.addControl('barristerChambers', this.barristerChambers);
    this.form.addControl('barristerEmail', this.barristerEmail);
    this.clearBarristerDetails();
  }

  private initFormWithValues() {
    this.barristerName.setValue(this.model.appointingBarristerDetails.fullName);
    this.barristerChambers.setValue(this.model.appointingBarristerDetails.chambers);
    this.barristerEmail.setValue(this.model.appointingBarristerDetails.email);
  }

  private clearBarristerDetails() {
    this.barristerName.setValue('');
    this.barristerChambers.setValue('');
    this.barristerEmail.setValue('');
  }

  protected bindModel(): void {
    this.model.appointingBarrister = this.choice.value;
    this.model.appointingBarristerDetails = new AppointingBarristerDetails();
    this.model.appointingBarristerDetails.fullName = this.barristerName.value;
    this.model.appointingBarristerDetails.chambers = this.barristerChambers.value;
    this.model.appointingBarristerDetails.email = this.barristerEmail.value;
  }

  validateEmail() {
    /* tslint:disable: max-line-length */
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isValidEmail = this.barristerEmail && this.barristerEmail.value.length > 0 && pattern.test(this.barristerEmail.value.toLowerCase());
  }

  blurEmail() {
    if (this.barristerEmail.touched
      && this.barristerEmail.value.length > 0) {
      this.validateEmail();
    } else {
      this.isValidEmail = true;
    }
  }

  async submit(): Promise<void> {
    if (this.trySubmit()) {
      this.journey.goto(RepresentativeJourneySteps.OtherInformation);
    }
  }
}
