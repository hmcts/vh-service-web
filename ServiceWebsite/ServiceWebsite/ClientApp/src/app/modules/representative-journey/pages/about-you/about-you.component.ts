import { ChoiceTextboxForm } from './../../../base-journey/components/choice-textbox-form';
import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})

export class AboutYouComponent implements OnInit {

  readonly form = new ChoiceTextboxForm();

  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
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
