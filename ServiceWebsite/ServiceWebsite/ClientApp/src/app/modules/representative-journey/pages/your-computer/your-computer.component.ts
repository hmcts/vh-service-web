import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent
} from 'src/app/modules/representative-journey/components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.computer);
  }

  protected bindModel(): void {
    this.model.computer = this.choice.value;
  }
}
