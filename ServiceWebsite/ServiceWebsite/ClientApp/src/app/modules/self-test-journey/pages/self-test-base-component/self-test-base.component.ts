import {OnInit, Injectable} from '@angular/core';
import {SelfTestJourney} from '../../self-test-journey';
import {SelfTestModel} from '../../self-test.model';

@Injectable()
export abstract class SelfTestBaseComponent implements OnInit {
  constructor(private journey: SelfTestJourney) {
  }

  ngOnInit(): void {
  }

  fail(): void {
    this.journey.fail();
  }

  continue(): void {
    this.journey.next();
  }

  get model(): SelfTestModel {
    return this.journey.model;
  }
}
