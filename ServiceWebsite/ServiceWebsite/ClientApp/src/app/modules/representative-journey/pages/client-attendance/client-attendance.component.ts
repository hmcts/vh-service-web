import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-client-attendance',
  templateUrl: './client-attendance.component.html'
})
export class ClientAttendanceComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.clientAttendance);
  }

  protected bindModel(): void {
    this.model.clientAttendance = this.choice.value;
  }

  submit() {
    if (this.trySubmit()) {
      this.journey.goto(RepresentativeJourneySteps.HearingSuitability);
    }
  }
}
