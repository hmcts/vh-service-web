import {Component, OnInit} from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';
import {ParticipantSuitabilityModel} from '../../../base-journey/participant-suitability.model';

@Component({
  selector: 'app-see-and-hear-video',
  templateUrl: './see-and-hear-video.component.html',
  styles: []
})
export class SeeAndHearVideoComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase, private model: ParticipantSuitabilityModel) {
    super(journey);
  }

  ngOnInit(): void {
    this.choice.setValue(this.model.selfTest.seeAndHearClearly);
  }

  protected bindModel(): void {
    this.model.selfTest.seeAndHearClearly = this.choice.value;
  }
}
