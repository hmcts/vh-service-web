import { Component, OnInit } from '@angular/core';
import { SuitabilityChoicePageBaseComponent } from '../../components/suitability-choice-page-base.component';
import { IndividualJourney } from '../../individual-journey';

@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent extends SuitabilityChoicePageBaseComponent implements OnInit {
    hearingDate: Date;

    constructor(journey: IndividualJourney) {
        super(journey);
    }

    ngOnInit() {
        this.hearingDate = this.model.hearing.scheduleDateTime;
    }

    protected bindModel(): void {}
}
