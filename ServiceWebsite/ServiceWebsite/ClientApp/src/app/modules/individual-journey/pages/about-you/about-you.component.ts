import { Component, OnInit } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { ChoiceTextboxForm } from 'src/app/modules/base-journey/components/choice-textbox-form';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html'
})
export class AboutYouComponent {

  readonly journey: IndividualJourney;

  constructor(journey: IndividualJourney) {
    this.journey = journey;
  }
}
