import { Component } from '@angular/core';
import { IndividualJourney } from '../../individual-journey';
import { SelfTestJourneySteps } from '../../../self-test-journey/self-test-journey-steps';

@Component({
    selector: 'app-about-hearings',
    templateUrl: './about-hearings.component.html',
    styles: []
})
export class AboutHearingsComponent {
    constructor(private journey: IndividualJourney) {}

    continue() {
        this.journey.goto(SelfTestJourneySteps.CheckYourComputer);
    }
}
