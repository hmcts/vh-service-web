import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxForm } from 'src/app/modules/base-journey/components/choice-textbox-form';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent implements OnInit {

  readonly form = new ChoiceTextboxForm;
  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    this.journey =  journey;
  }

  ngOnInit() {
    this.form.submitted.subscribe(() => this.continue());
    this.form.choice.setValue(this.journey.model.aboutYourClient.answer);
    this.form.textInput.setValue(this.journey.model.aboutYourClient.notes);
  }

  protected continue(): void {
    this.journey.model.aboutYourClient.answer = this.form.choice.value;
    this.journey.model.aboutYourClient.notes = this.form.choice.value ? this.form.textInput.value : null;
    this.journey.next();
  }
}
