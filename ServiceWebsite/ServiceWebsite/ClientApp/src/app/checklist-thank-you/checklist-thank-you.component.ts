import { Component, OnInit } from '@angular/core';
import { LocaleResources } from '../shared/resources/locale-resources';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from 'src/app/models/user-profile.model';
import { CONFIG } from '../shared/config';

@Component({
  selector: 'app-checklist-thank-you',
  templateUrl: './checklist-thank-you.component.html',
  styleUrls: ['./checklist-thank-you.component.css']
})
export class ChecklistThankYouComponent implements OnInit {
  localeResources: any;
  profile: UserProfile;
  isProfessional: boolean;
  constructor(private profileService: ProfileService) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
    this.profileService.getUserProfile().then(p => {
      this.profile = p;
      this.isProfessional = this.profile.isProfessional;
    });
  }
}
