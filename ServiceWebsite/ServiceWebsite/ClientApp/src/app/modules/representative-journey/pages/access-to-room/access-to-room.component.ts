import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { RepresentativeJourney } from '../../representative-journey';

@Component({
  selector: 'app-access-to-room',
  templateUrl: './access-to-room.component.html',
  styleUrls: []
})
export class AccessToRoomComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  constructor(journey: RepresentativeJourney) {
    super(journey);
  }

  ngOnInit() {
    this.choice.setValue(this.model.room);
  }

  protected bindModel(): void {
    this.model.room = this.choice.value;
  }
}
