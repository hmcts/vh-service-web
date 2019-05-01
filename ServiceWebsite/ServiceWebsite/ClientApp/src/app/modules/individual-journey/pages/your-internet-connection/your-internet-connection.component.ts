import { Component } from '@angular/core';
import { IndividualBaseComponent } from '../individual-base-component/individual-base.component';

@Component({
  selector: 'app-your-internet-connection',
  templateUrl: './your-internet-connection.component.html',
  styles: []
})
export class YourInternetConnectionComponent extends IndividualBaseComponent {

  yes() {
    this.model.internet = true;
    this.continue();
  }
  no() {
    this.model.internet = false;
    this.continue();
  }
}
