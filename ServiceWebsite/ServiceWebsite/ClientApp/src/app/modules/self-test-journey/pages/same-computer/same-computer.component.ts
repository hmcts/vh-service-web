import {Component, OnInit} from '@angular/core';
import {SelfTestSuitabilityChoicePageBaseComponent} from '../../components/self-test-suitability-choice-page-base.component';
import {SelfTestJourney} from '../../self-test-journey';

@Component({
  selector: 'app-same-computer',
  templateUrl: './same-computer.component.html',
  styles: []
})
export class SameComputerComponent extends SelfTestSuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: SelfTestJourney) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.sameComputer);
  }

  protected bindModel(): void {
    this.model.selfTest.sameComputer = this.choice.value;
  }
}
