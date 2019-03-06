import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { ChecklistService } from '../services/checklist.service';
import { ProfileService } from '../services/profile.service';
import { PageUrls } from '../shared/page-url.constants';
import { ChecklistBaseComponent } from '../shared/checklist-base-component/checklist-base.component';

// Placeholder component for the citizen journey video hearing suitability checklist start page
@Component({
  selector: 'app-checklist-consent-component',
  templateUrl: './checklist-consent.component.html'
})
export class ChecklistConsentComponent extends ChecklistBaseComponent implements OnInit {
  model: any = {
  };

  @ViewChild('userForm')
  form: any;

  isReasonInvalid: boolean = false;
  submitted: boolean = false;

  constructor(
    protected profileService: ProfileService,
    protected hearingService: HearingService,
    protected checklistSessionService: ChecklistSessionService,
    private checklistService: ChecklistService,
    private router: Router) {
    super(hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    this.loadHearingDetails();
  }

  async submitConsent() {
    if (this.form.invalid) {
      this.submitted = true;
      this.isReasonInvalid = this.model.videoHearingConsent === 'no' && (this.model.videoHearingReason === undefined || (this.model.videoHearingReason && this.model.videoHearingReason.invalid));
      return;
    }

    if (this.model.videoHearingConsent === 'yes') {
      this.checklist.Consent.yes();
    } else {
      this.checklist.Consent.no();
      this.checklist.Consent.Details = this.model.videoHearingReason;
    }

    await this.checklistService.submitChecklist(this.checklist);
    this.router.navigate([PageUrls.ChecklistThankyou]);
  }
}
