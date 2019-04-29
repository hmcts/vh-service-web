import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { UserProfile } from 'src/app/modules/shared/models/user-profile.model';
import { By } from '@angular/platform-browser';


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



describe('HeaderComponent',
  () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const router = {
      navigate: jasmine.createSpy('navigate')
    };

    const profileService = new MockProfileService();

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
        providers: [
          { provide: Router, useValue: router },
          { provide: ProfileService, useValue: profileService },
        ]
      },
      )
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should navigate to logout page on pressing logout', () => {
      component.loggedIn = true;
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.css('#header-logout-link'));
      link.triggerEventHandler('click', null);

      expect(router.navigate).toHaveBeenCalledWith(['/logout']);
    });
  });
