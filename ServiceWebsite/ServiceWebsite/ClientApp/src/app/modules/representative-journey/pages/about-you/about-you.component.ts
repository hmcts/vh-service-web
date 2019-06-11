import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import {
  SuitabilityChoiceTextboxPageBaseComponent
} from '../../../base-journey/components/suitability-choice-textbox-page-base.component';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})

export class AboutYouComponent
  extends SuitabilityChoiceTextboxPageBaseComponent<RepresentativeJourney> implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  protected bindModel(): void {
    this.journey.model.aboutYou.answer = this.choice.value;
    this.journey.model.aboutYou.notes = this.choice.value ? this.textInput.value : null;
  }

  ngOnInit() {
    this.form.addControl('textInput', this.textInput);

    super.ngOnInit();
    this.choice.setValue(this.journey.model.aboutYou.answer);
    this.textInput.setValue(this.journey.model.aboutYou.notes);
  }

}
