import { BaseAccordionComponent } from './../base-accordion-component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html'
})
export class ShowDetailsComponent extends BaseAccordionComponent {
  @Input()
  detailsTitle: string;

  @Input()
  textArray: Array<string> = [];
}
