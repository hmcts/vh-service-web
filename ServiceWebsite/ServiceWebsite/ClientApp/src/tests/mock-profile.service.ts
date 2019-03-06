import { UserProfile } from 'src/app/models/user-profile.model';
import { Constants } from 'src/app/shared/constants';

export class MockProfileService {
    private role: string = Constants.UserType.ProfessionalUser;

    currentProfileIs(role: string) {
      this.role = role;
    }

    getUserProfile(): Promise<UserProfile> {
        const profile = new UserProfile();
        profile.role = this.role;
        profile.email = 'professional@hearings.hmcts.net';
        return Promise.resolve(profile);
    }

    public get isLoggedIn(): boolean {
        return true;
    }
}
