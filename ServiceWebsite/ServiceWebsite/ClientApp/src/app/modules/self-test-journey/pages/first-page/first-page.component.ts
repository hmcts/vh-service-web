import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styles: []
})
export class FirstPageComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    console.log('******* First Page');
    super.ngOnInit();
  }
}
