import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-microphone-working',
  templateUrl: './microphone-working.component.html',
  styles: []
})
export class MicrophoneWorkingComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }
}
