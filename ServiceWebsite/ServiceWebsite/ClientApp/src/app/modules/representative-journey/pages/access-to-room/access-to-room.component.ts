import { Component,OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';

@Component({
  selector: 'app-access-to-room',
  templateUrl: './access-to-room.component.html',
  styleUrls: ['./access-to-room.component.css']
})
export class AccessToRoomComponent extends SuitabilityChoicePageBaseComponent implements OnInit {

  ngOnInit() {
    this.choice.setValue(this.model.room);
  }

  protected bindModel(): void {
    this.model.room = this.choice.value;
  }
}
