import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {
  hearingDate: Date;

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
  }
  protected bindModel() {
    this.model.computer = this.choice.value;
  }
}
