import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-client-attendance',
  templateUrl: './client-attendance.component.html'
})
export class ClientAttendanceComponent extends SuitabilityChoicePageBaseComponent implements OnInit {


  ngOnInit() {
    this.choice.setValue(this.model.clientAttendance);
  }

  protected bindModel(): void {
    this.model.clientAttendance = this.choice.value;
  }
}
