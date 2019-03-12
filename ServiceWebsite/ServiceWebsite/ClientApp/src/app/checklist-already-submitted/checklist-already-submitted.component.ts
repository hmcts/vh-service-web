import { Component, OnInit } from '@angular/core';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';
import { UserProfile } from '../models/user-profile.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-checklist-already-submitted',
  templateUrl: './checklist-already-submitted.component.html'
})
export class ChecklistAlreadySubmittedComponent implements OnInit {

  localeResources: any;
  showTextDetails = false;
  userProfile: UserProfile;
  isProfessional: boolean;

  constructor(private profileService: ProfileService) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  showDetails(): void {
    this.showTextDetails = !this.showTextDetails;
  }

  ngOnInit() {
    this.profileService.getUserProfile().then(profile => {
      this.userProfile = <UserProfile>profile;
      this.isProfessional = profile.isProfessional;
    });
  }

}
