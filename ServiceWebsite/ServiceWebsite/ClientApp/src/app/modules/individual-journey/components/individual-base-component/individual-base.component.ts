import { OnInit, Injectable } from '@angular/core';

@Injectable()
export abstract class IndividualBaseComponent implements OnInit {
    ngOnInit(): void {}

    protected continue(): void {
        // will contain code to proceed to next step
    }
}
