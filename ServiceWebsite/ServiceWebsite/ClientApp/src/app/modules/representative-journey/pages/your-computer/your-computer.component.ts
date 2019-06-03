import { Component, OnInit } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';

@Component({
  selector: 'app-your-computer',
  templateUrl: './your-computer.component.html',
  styles: []
})
export class YourComputerComponent extends RepresentativeBaseComponent {
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
