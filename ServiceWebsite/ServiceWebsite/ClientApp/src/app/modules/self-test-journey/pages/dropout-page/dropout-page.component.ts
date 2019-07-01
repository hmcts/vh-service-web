import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-dropout-page',
  templateUrl: './dropout-page.component.html',
  styles: []
})
export class DropoutPageComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    console.log('******* Dropout Page');
    super.ngOnInit();
  }
}
