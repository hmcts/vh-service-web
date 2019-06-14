import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxForm } from 'src/app/modules/base-journey/components/choice-textbox-form';

@Component({
  selector: 'app-hearing-suitability',
  templateUrl: './hearing-suitability.component.html',
  styles: []
})
export class HearingSuitabilityComponent implements OnInit {

  readonly form = new ChoiceTextboxForm;
  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    this.journey = journey;
  }

  ngOnInit() {
    this.form.submitted.subscribe(() => this.continue());
    this.form.choice.setValue(this.journey.model.hearingSuitability.answer);
    this.form.textInput.setValue(this.journey.model.hearingSuitability.notes);
  }

  protected continue(): void {
    this.journey.model.hearingSuitability.answer = this.form.choice.value;
    this.journey.model.hearingSuitability.notes = this.form.choice.value ? this.form.textInput.value : null;
    this.journey.next();
  }
}
