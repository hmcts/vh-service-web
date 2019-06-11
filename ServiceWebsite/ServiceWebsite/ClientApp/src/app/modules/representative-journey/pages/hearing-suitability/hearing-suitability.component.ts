import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoiceTextboxPageBaseComponent
} from 'src/app/modules/base-journey/components/suitability-choice-textbox-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-hearing-suitability',
  templateUrl: './hearing-suitability.component.html',
  styles: []
})
export class HearingSuitabilityComponent
  extends SuitabilityChoiceTextboxPageBaseComponent<RepresentativeJourney> implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.form.addControl('textInput', this.textInput);

    super.ngOnInit();
    this.choice.setValue(this.journey.model.hearingSuitability.answer);
    this.textInput.setValue(this.journey.model.hearingSuitability.notes);
  }

  protected bindModel(): void {
    this.journey.model.hearingSuitability.answer = this.choice.value;
    this.journey.model.hearingSuitability.notes = this.choice.value ? this.textInput.value : null;
  }
}
