import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import {Logger} from '../../../../services/logger';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {
  hearingDate: Date;

  constructor(journey: IndividualJourney, private logger: Logger) {
    super(journey);
  }

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
    this.choice.setValue(this.model.computer);
  }

  protected bindModel() {
    this.model.computer = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    if (this.model.computer === false) {
      this.journey.submitQuestionnaire();
      this.logger.event('telemetry:individual:dropout:HasAccessToComputer:No');
      this.journey.goto(IndividualJourneySteps.ThankYou);
    } else {
      this.journey.goto(IndividualJourneySteps.AboutYourComputer);
    }
  }
}
