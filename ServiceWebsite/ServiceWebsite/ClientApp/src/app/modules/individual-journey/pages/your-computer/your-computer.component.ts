import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {
  hearingDate: Date;

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
    this.choice.setValue(this.model.computer);
  }

  protected bindModel() {
    this.model.computer = this.choice.value;
  }
}
