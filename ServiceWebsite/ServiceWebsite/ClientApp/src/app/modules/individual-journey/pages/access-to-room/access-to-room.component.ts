import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-access-to-room',
  templateUrl: './access-to-room.component.html',
  styles: []
})
export class AccessToRoomComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  hearingDate: Date;

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
  }

  protected bindModel() {
    this.model.room = this.choice.value;
  }
}
