import { Component, OnInit } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import {
  SuitabilityChoiceTextboxPageBaseComponent
} from '../../../base-journey/components/suitability-choice-textbox-page-base.component';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
  styles: []
})
export class AboutYourClientComponent
  extends SuitabilityChoiceTextboxPageBaseComponent<RepresentativeJourney> implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.form.addControl('textInput', this.textInput);

    super.ngOnInit();
    this.choice.setValue(this.journey.model.aboutYourClient.answer);
    this.textInput.setValue(this.journey.model.aboutYourClient.notes);
  }

  protected bindModel(): void {
    this.journey.model.aboutYourClient.answer = this.choice.value;
    this.journey.model.aboutYourClient.notes = this.choice.value ? this.textInput.value : null;
  }
}
