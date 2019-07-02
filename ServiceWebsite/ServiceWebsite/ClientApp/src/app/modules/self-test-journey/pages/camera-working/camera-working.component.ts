import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-camera-working',
  templateUrl: './camera-working.component.html',
  styles: []
})
export class CameraWorkingComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }
}
