import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html'
})
export class ShowDetailsComponent {
  @Input()
  detailsTitle: string;

  @Input()
  textArray: Array<string> = [];

  showTextDetails = false;

  showDetails() {
    this.showTextDetails = !this.showTextDetails;
  }
}
