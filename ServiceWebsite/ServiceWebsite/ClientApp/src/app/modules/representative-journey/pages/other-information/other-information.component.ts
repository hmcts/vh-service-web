import { Component, OnInit } from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent
} from 'src/app/modules/representative-journey/components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styles: []
})
export class OtherInformationComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    
  }

  protected bindModel(): void {
    
  }

  async submit(): Promise<void> {
    if (!this.trySubmit()) {
      return;
    }
  }
}
