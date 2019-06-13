import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxFormComponentBase } from 'src/app/modules/base-journey/components/choice-textbox-form-component-base';

@Component({
  selector: 'app-hearing-suitability',
  templateUrl: './hearing-suitability.component.html',
  styles: []
})
export class HearingSuitabilityComponent extends ChoiceTextboxFormComponentBase implements OnInit {

  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    super();
    this.journey = journey;
  }

  ngOnInit() {
    super.ngOnInit();
    this.choice.setValue(this.journey.model.hearingSuitability.answer);
    this.textInput.setValue(this.journey.model.hearingSuitability.notes);
  }

  protected bind(): void {
    this.journey.model.hearingSuitability.answer = this.choice.value;
    this.journey.model.hearingSuitability.notes = this.choice.value ? this.textInput.value : null;
  }
}
