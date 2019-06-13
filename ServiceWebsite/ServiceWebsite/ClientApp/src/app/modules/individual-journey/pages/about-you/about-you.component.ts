import { Component, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { ChoiceTextboxFormComponentBase } from 'src/app/modules/base-journey/components/choice-textbox-form-component-base';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent extends ChoiceTextboxFormComponentBase implements OnInit {

  readonly journey: IndividualJourney;

  constructor(journey: IndividualJourney) {
    super();
    this.journey = journey;
  }

  ngOnInit() {
    super.ngOnInit();
    this.choice.setValue(this.journey.model.aboutYou.answer);
    this.textInput.setValue(this.journey.model.aboutYou.notes);
  }

  protected bind(): void {
    this.journey.model.aboutYou.answer = this.choice.value;
    this.journey.model.aboutYou.notes = this.choice.value ? this.textInput.value : null;
  }
}
