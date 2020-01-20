import {Component} from '@angular/core';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneySteps} from 'src/app/modules/self-test-journey/self-test-journey-steps';


@Component({
  selector: 'app-answers-saved',
  templateUrl: './answers-saved.component.html',
  styleUrls: ['./answers-saved.component.css']
})

export class AnswersSavedComponent {
    constructor(private journey: JourneyBase) {
  }

  continue() {
    this.journey.goto(SelfTestJourneySteps.CheckYourComputer);
  }
}

