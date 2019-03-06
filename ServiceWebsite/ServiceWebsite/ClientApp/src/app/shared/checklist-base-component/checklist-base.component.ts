import { OnInit } from '@angular/core';
import { LocaleResources } from '../resources/locale-resources';
import { CONFIG } from '../config';
import { Constants } from 'src/app/shared/constants';
import { HearingService } from '../../services/hearing.service';
import { ProfileService } from '../../services/profile.service';
import { ChecklistModel } from '../../models/checklist.model';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { PageUrls } from '../page-url.constants';

export abstract class ChecklistBaseComponent implements OnInit {
  localeResources: any;
  checklist: ChecklistModel;
  isProfessional: boolean;
  pageUrl = PageUrls;

  constructor(
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
  }

  async loadHearingDetails() {
    const hearingDetails = await this.hearingService.getNextHearingDetails();
    const profile = await this.profileService.getUserProfile();
    this.isProfessional = profile.isProfessional;
    this.checklist = this.checklistSessionService.getChecklist(hearingDetails.id, profile.email);
  }
}
