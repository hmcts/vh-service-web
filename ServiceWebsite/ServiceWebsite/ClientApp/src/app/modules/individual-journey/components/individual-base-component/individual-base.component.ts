import { OnInit, Injectable } from '@angular/core';
import { IndividualLocalisation } from '../../services/individual-localisation';

@Injectable()
export abstract class IndividualBaseComponent implements OnInit {
    constructor(protected localisation: IndividualLocalisation) {}

    ngOnInit(): void {}

    protected continue(): void {
        // will contain code to proceed to next step
    }
}
