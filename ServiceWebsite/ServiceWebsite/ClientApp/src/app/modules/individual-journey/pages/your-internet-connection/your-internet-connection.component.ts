import { Component } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-your-internet-connection',
  templateUrl: './your-internet-connection.component.html',
  styles: []
})
export class YourInternetConnectionComponent extends SuitabilityChoicePageBaseComponent {
  protected bindModel() {
    this.model.internet = this.choice.value;
  }
 }
