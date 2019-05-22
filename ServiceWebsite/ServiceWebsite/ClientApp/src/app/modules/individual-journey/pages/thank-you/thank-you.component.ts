import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styles: []
})
export class ThankYouComponent extends SuitabilityChoicePageBaseComponent implements OnInit {
  hearingDate: Date;

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
  }

  protected bindModel(): void { }
}
