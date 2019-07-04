import { OnInit, Injectable } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { IndividualSuitabilityModel } from '../../individual-suitability.model';

@Injectable()
export abstract class IndividualBaseComponent implements OnInit {
    constructor(private journey: IndividualJourney) {}

    ngOnInit(): void {}

    fail(): void {
        this.journey.fail();
    }

    get model(): IndividualSuitabilityModel {
        return this.journey.model;
    }
}
