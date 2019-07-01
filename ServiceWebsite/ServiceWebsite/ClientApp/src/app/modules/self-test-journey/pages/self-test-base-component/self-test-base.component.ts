import { OnInit, Injectable } from '@angular/core';

@Injectable()
export abstract class SelfTestBaseComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    fail(): void {

    }

    continue(): void {

    }

    get model(): any {
      return '';
    }
}
