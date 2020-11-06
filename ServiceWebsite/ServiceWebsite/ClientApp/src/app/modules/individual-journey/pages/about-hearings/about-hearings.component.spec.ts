import { AboutHearingsComponent } from './about-hearings.component';
import { IndividualJourney } from '../../individual-journey';
import { SelfTestJourneySteps } from '../../../self-test-journey/self-test-journey-steps';

describe('AboutHearingsComponent', () => {
    it(`should continue to ${SelfTestJourneySteps.CheckYourComputer}`, () => {
        const journey = jasmine.createSpyObj<IndividualJourney>(['goto']);
        const component = new AboutHearingsComponent(journey);
        component.continue();
        expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CheckYourComputer);
    });
});
