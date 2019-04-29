import { JourneyFactory } from 'src/app/modules/base-journey/services/journey.factory';
import { HomeComponent } from './home.component';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';

describe('HomeComponent', () => {
    it('starts journey on init', () => {
        const journey = jasmine.createSpyObj<JourneyBase>(['begin']);
        const journeyFactory = jasmine.createSpyObj<JourneyFactory>(['getJourney']);
        journeyFactory.getJourney.and.returnValue(journey);

        const component = new HomeComponent(journeyFactory);
        component.ngOnInit();

        expect(journey.begin).toHaveBeenCalled();
    });
});
