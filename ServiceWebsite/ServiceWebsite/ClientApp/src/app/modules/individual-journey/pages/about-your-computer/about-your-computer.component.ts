import { Component } from '@angular/core';
import { HasAccessToCamera } from '../../individual-suitability.model';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends SuitabilityChoicePageBaseComponent {

  protected bindModel(): void {
    switch (this.choice.value) {
      case 'notSure':
        this.model.camera = HasAccessToCamera.NotSure;
      case 'no':
        this.model.camera = HasAccessToCamera.No;
      case 'yes':
        this.model.camera = HasAccessToCamera.Yes;
      default:
    }
  }
}
