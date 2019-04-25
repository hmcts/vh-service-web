import { OnInit, Injectable } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';

@Injectable()
export abstract class IndividualBaseComponent implements OnInit {
    constructor(private journey: IndividualJourney) {}

    ngOnInit(): void {}

    fail(): void {
        this.journey.fail();
    }

    continue(): void {
        this.journey.next();
    }
}
