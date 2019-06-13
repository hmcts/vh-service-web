import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { ChoiceTextboxFormComponentBase } from 'src/app/modules/base-journey/components/choice-textbox-form-component-base';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent extends ChoiceTextboxFormComponentBase implements OnInit {

  readonly journey: RepresentativeJourney;

  constructor(journey: RepresentativeJourney) {
    super();
    this.journey =  journey;
  }

  ngOnInit() {
    super.ngOnInit();
    this.choice.setValue(this.journey.model.aboutYourClient.answer);
    this.textInput.setValue(this.journey.model.aboutYourClient.notes);
  }

  protected bind(): void {
    this.journey.model.aboutYourClient.answer = this.choice.value;
    this.journey.model.aboutYourClient.notes = this.choice.value ? this.textInput.value : null;
  }
}
