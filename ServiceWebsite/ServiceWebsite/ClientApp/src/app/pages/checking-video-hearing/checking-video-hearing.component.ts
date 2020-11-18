import { Component } from '@angular/core';
import { ParticipantJourney } from 'src/app/modules/base-journey/participant-journey';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';

@Component({
    selector: 'app-checking-video-hearing',
    templateUrl: './checking-video-hearing.component.html',
    styles: []
})
export class CheckingVideoHearingComponent {
    constructor(private journey: ParticipantJourney) { }

    continue() {
        this.journey.goto(SelfTestJourneySteps.CheckYourComputer);
    }
}
