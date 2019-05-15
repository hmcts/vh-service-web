import { Component } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends SuitabilityChoicePageBaseComponent {

  protected bindModel() {
    this.model.computer = this.choice.value;
  }
}
