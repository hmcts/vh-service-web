import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends IndividualBaseComponent {

  yes() {
    this.model.computer = true;
    console.log(this.model.computer);
    this.continue();
  }
  no() {
    this.model.computer = false;
    console.log(this.model.computer);
    this.continue();
  }
}
