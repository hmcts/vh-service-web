import { OnInit, Injectable } from '@angular/core';

@Injectable()
export abstract class IndividualBaseComponent implements OnInit {
    ngOnInit(): void {}

    continue(): void {
        // will contain code to proceed to next step
    }

    fail(): void {
        // will contain code to proceed to a step after failure or abortion of the current step
    }
}
