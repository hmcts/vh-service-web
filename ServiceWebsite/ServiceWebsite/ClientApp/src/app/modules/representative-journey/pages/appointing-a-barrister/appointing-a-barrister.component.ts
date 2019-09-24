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
      this.showBarristerDetails = value === this.appointingBarrister.BarristerWillBeAppointed;
    });

  }

  private initForm() {
    this.form.addControl('barristerName', this.barristerName);
    this.form.addControl('barristerChambers', this.barristerChambers);
    this.form.addControl('barristerEmail', this.barristerEmail);
  }

  private initFormWithValues() {
    this.barristerName.setValue(this.model.appointingBarristerDetails.fullName);
    this.barristerChambers.setValue(this.model.appointingBarristerDetails.chambers);
    this.barristerEmail.setValue(this.model.appointingBarristerDetails.email);
  }

  protected bindModel(): void {
    this.model.appointingBarrister = this.choice.value;
    this.model.appointingBarristerDetails = new AppointingBarristerDetails();
    this.model.appointingBarristerDetails.fullName = this.barristerName.value;
    this.model.appointingBarristerDetails.chambers = this.barristerChambers.value;
    this.model.appointingBarristerDetails.email = this.barristerEmail.value;
  }

  async submit(): Promise<void> {
    if (this.trySubmit()) {
      this.journey.goto(RepresentativeJourneySteps.OtherInformation);
    }
  }
}
