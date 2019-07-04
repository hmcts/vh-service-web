import { ParticipantJourneySteps } from './../../../base-journey/participant-journey-steps';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { Component } from '@angular/core';

@Component({
  selector: 'app-see-and-hear-video',
  templateUrl: './see-and-hear-video.component.html',
  styles: []
})
export class SeeAndHearVideoComponent {
  constructor(private journey: JourneyBase) { }

  async continue(): Promise<void> {
    await this.journey.submitQuestionnaire();
    this.journey.goto(ParticipantJourneySteps.ThankYou);
  }
}
