
import { Component } from '@angular/core';
import { ParticipantJourney } from 'src/app/modules/base-journey/participant-journey';
import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';
import { CheckingVideoHearingComponent } from './checking-video-hearing.component';

describe('CheckingVideoHearingComponent', () => {
    it(`should continue to ${SelfTestJourneySteps.CheckYourComputer}`, () => {
        const journey = jasmine.createSpyObj<ParticipantJourney>(['goto']);
        const component = new CheckingVideoHearingComponent(journey);
        component.continue();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CheckYourComputer);
    });
});
