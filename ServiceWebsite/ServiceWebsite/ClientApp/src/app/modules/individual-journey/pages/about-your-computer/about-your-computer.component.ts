import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';
import { HasAccessToCamera } from '../../individual-suitability.model';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends IndividualBaseComponent {

  yes() {
    this.model.camera = HasAccessToCamera.Yes;
    console.log(this.model.camera);
    this.continue();
  }
  no() {
    this.model.camera = HasAccessToCamera.No;
    console.log(this.model.camera);
    this.continue();
  }
  notsure() {
    this.model.camera = HasAccessToCamera.NotSure;
    console.log(this.model.camera);
    this.continue();
  }
}
