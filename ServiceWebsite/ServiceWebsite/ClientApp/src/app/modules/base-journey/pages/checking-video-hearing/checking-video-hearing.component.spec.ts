import { SelfTestJourneySteps } from 'src/app/modules/self-test-journey/self-test-journey-steps';
import { CheckingVideoHearingComponent } from './checking-video-hearing.component';
import { Router } from '@angular/router';

describe('CheckingVideoHearingComponent', () => {
    it(`should continue to ${SelfTestJourneySteps.CheckYourComputer}`, () => {
        const router = {
            url: '/check-your-computer',
            ...jasmine.createSpyObj<Router>(['navigate'])
        } as jasmine.SpyObj<Router>;
        const component = new CheckingVideoHearingComponent(router);
        component.continue();
        expect(router.navigate).toHaveBeenCalled();
    });
});
