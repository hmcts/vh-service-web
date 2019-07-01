import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styles: []
})
export class SecondPageComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    console.log('******* Second Page');
    super.ngOnInit();
  }
}
