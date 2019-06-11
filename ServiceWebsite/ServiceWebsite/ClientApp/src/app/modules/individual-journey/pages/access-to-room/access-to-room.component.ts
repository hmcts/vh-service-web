import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
  selector: 'app-access-to-room',
  templateUrl: './access-to-room.component.html',
  styles: []
})
export class AccessToRoomComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  hearingDate: Date;

  constructor(journey: IndividualJourney) {
    super(journey);
  }

  ngOnInit() {
    this.hearingDate = this.model.hearing.scheduleDateTime;
    this.choice.setValue(this.model.room);
  }

  protected bindModel() {
    this.model.room = this.choice.value;
  }
}
