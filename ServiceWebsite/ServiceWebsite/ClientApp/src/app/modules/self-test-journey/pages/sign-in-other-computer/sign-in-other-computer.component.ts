import {Component, OnInit} from '@angular/core';
import {
  SuitabilityChoicePageBaseComponent as GenericSuitabilityChoicePageBaseComponent
} from '../../../base-journey/components/suitability-choice-page-base.component';
import {JourneyBase} from '../../../base-journey/journey-base';

@Component({
  selector: 'app-sign-in-other-computer',
  templateUrl: './sign-in-other-computer.component.html',
  styles: []
})
export class SignInOtherComputerComponent extends GenericSuitabilityChoicePageBaseComponent<JourneyBase> implements OnInit {

  constructor(journey: JourneyBase) {
    super(journey);
  }

  ngOnInit(): void {
  }

  protected bindModel(): void {
  }
}
