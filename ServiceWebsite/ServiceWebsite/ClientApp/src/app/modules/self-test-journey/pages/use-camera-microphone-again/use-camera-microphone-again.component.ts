import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-use-camera-microphone-again',
  templateUrl: './use-camera-microphone-again.component.html',
  styles: []
})
export class UseCameraMicrophoneAgainComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }
}
