import { Component, OnInit } from '@angular/core';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  hasAccessToCamera = HasAccessToCamera;

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit(): void {
    if (this.model.camera !== undefined && this.model.camera !== null) {
      this.choice.setValue(this.model.camera);
    }
  }

  protected bindModel(): void {
    this.model.camera = this.choice.value;
  }

  async submit(): Promise<void> {
    if (this.trySubmit()) {
      await this.journey.submitQuestionnaire();
      this.journey.goto(RepresentativeJourneySteps.AnswersSaved);
    }
  }
}
