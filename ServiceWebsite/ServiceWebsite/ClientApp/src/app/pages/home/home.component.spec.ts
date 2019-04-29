import { ProfileService } from 'src/app/services/profile.service';

import { HomeComponent } from './home.component';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { JourneySelector } from 'src/app/modules/base-journey/services/journey.selector';
import { UserProfile } from 'src/app/modules/shared/models/user-profile.model';

describe('HomeComponent', () => {
    it('starts journey on init', async () => {
        const journey = jasmine.createSpyObj<JourneyBase>(['begin']);
        const journeySelector = jasmine.createSpyObj<JourneySelector>(['getJourney']);
        journeySelector.getJourney.and.returnValue(Promise.resolve(journey));

        const profileService = jasmine.createSpyObj<ProfileService>(['getUserProfile']);
        profileService.getUserProfile.and.returnValue(Promise.resolve(new UserProfile));

        const component = new HomeComponent(journeySelector, profileService);
        await component.ngOnInit();

        expect(journey.begin).toHaveBeenCalled();
    });
});
