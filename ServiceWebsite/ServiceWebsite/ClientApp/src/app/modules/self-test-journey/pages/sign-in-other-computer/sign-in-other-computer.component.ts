import {Component, OnInit} from '@angular/core';
import {SelfTestBaseComponent} from '../self-test-base-component/self-test-base.component';

@Component({
  selector: 'app-sign-in-other-computer',
  templateUrl: './sign-in-other-computer.component.html',
  styles: []
})
export class SignInOtherComputerComponent extends SelfTestBaseComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }
}
