import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent
} from 'src/app/modules/representative-journey/components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.computer);
  }

  protected bindModel(): void {
    this.model.computer = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    if (this.model.computer) {
      this.journey.goto(RepresentativeJourneySteps.AboutYourComputer);
    } else {
      await this.journey.submitQuestionnaire();
      this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
    }
  }
}
