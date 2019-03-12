import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model';
import { PageUrls } from 'src/app/shared/page-url.constants';
import { ProfileService } from 'src/app/services/profile.service';
import { ChecklistService } from '../services/checklist.service';
import { DocumentRedirectService } from '../services/document-redirect.service';
import { Config } from '../models/config';

@Component({
  selector: 'home',
  template: ''
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private config: Config,
    private documentRedirect: DocumentRedirectService,
    private checklist: ChecklistService,
    private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserProfile()
      .then(userProfile => this.redirectUser(userProfile));
  }

  private async redirectUser(user: UserProfile) {
    if (user.isCitizen || user.isProfessional) {
      if (await this.checklist.isUserRequiredToSubmitChecklist()) {
        if (user.isProfessional) {
          this.router.navigate([PageUrls.ChecklistStart]);
        } else {
          this.router.navigate([PageUrls.AboutHearings]);
        }
        return;
      }
    }

    this.documentRedirect.to(this.config.videoAppUrl);
  }
}
