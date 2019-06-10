import { Component, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import {
  SuitabilityChoiceTextboxPageBaseComponent
} from '../../../base-journey/components/suitability-choice-textbox-page-base.component';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent
  extends SuitabilityChoiceTextboxPageBaseComponent<IndividualJourney> implements OnInit {

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.form.addControl('textInput', this.textInput);

    super.ngOnInit();
    this.choice.setValue(this.journey.model.aboutYou.answer);
    this.textInput.setValue(this.journey.model.aboutYou.notes);
  }

  protected bindModel(): void {
    this.journey.model.aboutYou.answer = this.choice.value;
    this.journey.model.aboutYou.notes = this.choice.value ? this.textInput.value : null;
  }
}
