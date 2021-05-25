import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from 'src/app/services/logger';
import { ProfileService } from 'src/app/services/profile.service';
import { MockLogger } from 'src/app/testing/mocks/mock-logger';
import { UserProfile } from '../shared/models/user-profile.model';
import { SharedModule } from '../shared/shared.module';
import { RepresentativeGuard } from './representative.gaurd';

describe('RepresentativeGuard', () => {
    let profileServiceSpy: jasmine.SpyObj<ProfileService>;
    let guard: RepresentativeGuard;
    const router = {
        navigate: jasmine.createSpy('navigate')
    };

    beforeEach(() => {
        profileServiceSpy = jasmine.createSpyObj<ProfileService>('ProfileService', ['getUserProfile']);
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            providers: [
                RepresentativeGuard,
                { provide: Router, useValue: router },
                { provide: ProfileService, useValue: profileServiceSpy },
                { provide: Logger, useClass: MockLogger }
            ]
        });
        guard = TestBed.inject(RepresentativeGuard);
    });

    it(
        'should not be able to activate component if role is Individual',
        waitForAsync(async () => {
            const profile = new UserProfile();
            profile.role = 'Individual';
            profile.email = 'Test.Individual@hearings.reform.hmcts.net';
            profileServiceSpy.getUserProfile.and.returnValue(profile);
            const result = await guard.canActivate(null, null);
            expect(result).toBeFalsy();
            expect(router.navigate).toHaveBeenCalledWith(['/unauthorised']);
        })
    );

    it(
        'should be able to activate component if role is Representative',
        waitForAsync(async () => {
            const profile = new UserProfile();
            profile.role = 'Representative';
            profile.email = 'Test.Representative@hearings.reform.hmcts.net';
            profileServiceSpy.getUserProfile.and.returnValue(profile);
            const result = await guard.canActivate(null, null);
            expect(result).toBeTruthy();
        })
    );

    it(
        'should logout when user profile cannot be retrieved',
        waitForAsync(async () => {
            profileServiceSpy.getUserProfile.and.returnValue(Promise.reject({ status: 404, isApiException: true }));
            const result = await guard.canActivate(null, null);
            expect(result).toBeFalsy();
            expect(router.navigate).toHaveBeenCalledWith(['/logout']);
        })
    );
});
