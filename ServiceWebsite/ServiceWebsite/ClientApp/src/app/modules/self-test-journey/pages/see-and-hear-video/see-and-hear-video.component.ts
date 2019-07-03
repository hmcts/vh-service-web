import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-see-and-hear-video',
  templateUrl: './see-and-hear-video.component.html',
  styles: []
})
export class SeeAndHearVideoComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }
}
