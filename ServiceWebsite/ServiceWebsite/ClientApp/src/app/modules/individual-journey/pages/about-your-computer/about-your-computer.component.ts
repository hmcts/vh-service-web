import { Component } from '@angular/core';
import { HasAccessToCamera } from '../../individual-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends SuitabilityChoicePageBaseComponent {

  hasAccessToCamera = HasAccessToCamera;

  protected bindModel(): void {
    this.model.camera = this.choice.value;
  }
}
