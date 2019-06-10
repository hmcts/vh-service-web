import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-your-internet-connection',
  templateUrl: './your-internet-connection.component.html',
  styles: []
})
export class YourInternetConnectionComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.internet);
  }

  protected bindModel() {
    this.model.internet = this.choice.value;
  }
}
