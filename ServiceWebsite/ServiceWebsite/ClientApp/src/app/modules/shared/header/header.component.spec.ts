import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/app/modules/shared/models/user-profile.model';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

export class MockProfileService {
    getUserProfile(): Promise<UserProfile> {
        const profile = new UserProfile();
        profile.role = 'professional';
        profile.email = 'professional@hearings.hmcts.net';
        return Promise.resolve(profile);
    }

    public get isLoggedIn(): boolean {
        return true;
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const router = {
        navigate: jasmine.createSpy('navigate')
    };

    const profileService = new MockProfileService();

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [HeaderComponent],
                providers: [
                    { provide: Router, useValue: router },
                    { provide: ProfileService, useValue: profileService }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should navigate to logout page on pressing logout', () => {
    //   component.loggedIn = true;
    //   fixture.detectChanges();

    //   const signOutElement = fixture.debugElement.queryAll(By.css('#header-logout-link'));
    //   expect(signOutElement.length).toBeGreaterThan(0);
    //   const el = signOutElement[0].nativeElement as HTMLElement;
    //   expect(el.innerHTML).toContain('Sign out');
    // });

    fit('should navigate to logout page on pressing logout', () => {
        component.loggedIn = true;
        fixture.detectChanges();

        const href = fixture.debugElement.query(By.css('#header-logout-link')).nativeElement.getAttribute('href');
        expect(expect(href)).toEqual('/login');
    });
});
