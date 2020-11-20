import { Component, OnInit } from '@angular/core';
import { RepresentativeJourneyService } from '../../services/representative.journey.service';
@Component({
    selector: 'app-thank-you',
    templateUrl: './thank-you.component.html'
})
export class ThankYouComponent implements OnInit {
    hearingDate: Date;

    constructor(private representativeJourneyService: RepresentativeJourneyService) {}

    ngOnInit() {
        const currentModel = this.representativeJourneyService.get();
        this.hearingDate = currentModel.hearing.scheduleDateTime;
    }
}
