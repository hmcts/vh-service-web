import { Component, OnInit } from '@angular/core';
import { RepresentativeBaseComponent } from '../representative-base-component/representative-base.component';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styles: []
})
export class ThankYouComponent extends RepresentativeBaseComponent implements OnInit {
  hearingDate: Date;

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
  }

  protected bindModel(): void { }
}
