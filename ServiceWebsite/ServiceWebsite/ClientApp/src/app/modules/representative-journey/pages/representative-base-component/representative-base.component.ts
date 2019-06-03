import { OnInit, Injectable } from '@angular/core';
import { RepresentativeJourney } from '../../representative-journey';
import { RepresentativeSuitabilityModel } from '../../representative-suitability.model';

@Injectable()
export abstract class RepresentativeBaseComponent implements OnInit {
    constructor(private journey: RepresentativeJourney) {}

    ngOnInit(): void {}

    fail(): void {
        this.journey.fail();
    }

    continue(): void {
        this.journey.next();
    }

    get model(): RepresentativeSuitabilityModel {
        return this.journey.model;
    }
}
