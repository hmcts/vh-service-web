import { ChoiceForm } from './../../../base-journey/components/choice-form';
import { Component, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styles: []
})
export class InterpreterComponent implements OnInit {

  readonly form = new ChoiceForm();

  constructor(private journey: IndividualJourney) {}

  ngOnInit() {
    this.form.choice.setValue(this.journey.model.interpreter);
    this.form.submitted.subscribe(() => this.bindModel());
  }

  protected bindModel() {
    this.journey.model.interpreter = this.form.choice.value;
    this.journey.next();
  }
}
