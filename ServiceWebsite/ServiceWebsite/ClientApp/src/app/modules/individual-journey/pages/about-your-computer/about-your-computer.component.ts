import { Component, OnInit } from '@angular/core';
import { HasAccessToCamera } from '../../individual-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  hasAccessToCamera = HasAccessToCamera;

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.camera);
  }

  protected bindModel(): void {
    this.model.camera = this.choice.value;
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }

    if (this.model.camera === HasAccessToCamera.No) {
      this.journey.submitQuestionnaire();
      this.journey.goto(IndividualJourneySteps.ThankYou);
    } else {
      this.journey.goto(IndividualJourneySteps.YourInternetConnection);
    }
  }
}
