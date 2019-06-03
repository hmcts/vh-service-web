import { Component, OnInit } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';

@Component({
  selector: 'app-about-your-computer',
  templateUrl: './about-your-computer.component.html',
  styles: []
})
export class AboutYourComputerComponent extends RepresentativeBaseComponent {
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
