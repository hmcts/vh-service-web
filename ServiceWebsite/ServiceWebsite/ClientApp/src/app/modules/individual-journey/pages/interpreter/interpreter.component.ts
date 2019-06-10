import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styles: []
})
export class InterpreterComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.interpreter);
  }

  protected bindModel() {
    this.model.interpreter = this.choice.value;
  }
}
