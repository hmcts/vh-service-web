import { Component, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { ChoiceTextboxFormComponentBase } from 'src/app/modules/base-journey/components/choice-textbox-form-component-base';
import { ChoiceTextboxForm } from 'src/app/modules/base-journey/components/choice-textbox-form';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent implements OnInit {

  readonly form = new ChoiceTextboxForm();
  readonly journey: IndividualJourney;

  constructor(journey: IndividualJourney) {
    this.journey = journey;
  }

  ngOnInit() {
    this.form.submitted.subscribe(() => this.continue());
    this.form.choice.setValue(this.journey.model.aboutYou.answer);
    this.form.textInput.setValue(this.journey.model.aboutYou.notes);
  }

  protected continue(): void {
    this.journey.model.aboutYou.answer = this.form.choice.value;
    this.journey.model.aboutYou.notes = this.form.choice.value ? this.form.textInput.value : null;
    this.journey.next();
  }
}
