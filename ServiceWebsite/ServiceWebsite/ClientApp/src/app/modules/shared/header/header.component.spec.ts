import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfile } from 'src/app/modules/shared/models/user-profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { HeaderComponent } from './header.component';

export class MockProfileService {
    getUserProfile(): Promise<UserProfile> {
        const profile = new UserProfile();
        profile.role = 'professional';
        profile.email = 'professional@hmcts.net';
        return Promise.resolve(profile);
    }

    public get isLoggedIn(): boolean {
        return true;
    }
}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const profileService = new MockProfileService();

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule],
                declarations: [HeaderComponent],
                providers: [{ provide: ProfileService, useValue: profileService }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should navigate to logout page on pressing logout', () => {
        component.loggedIn = true;
        fixture.detectChanges();

        const href = fixture.debugElement.query(By.css('#header-logout-link')).nativeElement.getAttribute('href');
        expect(href).toEqual(`/${component.logoutRoute}`);
    });

    it('logout button is not rendered when user is not logged in', () => {
        component.loggedIn = false;
        fixture.detectChanges();

        const logoutButton = fixture.debugElement.query(By.css('#header-logout-link'));
        expect(logoutButton).toBeNull();
    });
});
