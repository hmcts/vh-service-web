import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { Hearing } from '../models/hearing.model';
import { ProfileService } from '../services/profile.service';
import { PageUrls } from '../shared/page-url.constants';
import { UserProfile } from '../models/user-profile.model';
import { SessionStorage } from '../services/session-storage';
import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-about-your-client',
  templateUrl: './about-your-client.component.html',
})
export class AboutYourClientComponent extends ChecklistEditBaseComponent implements OnInit {
  hearingDetails: Hearing;
  userProfile: UserProfile;
  model: any = {};

  @ViewChild('userForm')
  form: any;

  submitted: boolean = false;

  constructor(
    protected profileService: ProfileService,
    protected hearingService: HearingService,
    protected checklistSessionService: ChecklistSessionService,
    private router: Router,
    protected sessionStorage: SessionStorage) {
    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadHearingDetails().then(() => {
      this.loadPreviousAnswer();
    });
  }

  private loadPreviousAnswer() {
    if (this.checklist.AboutClient.IsValueSet) {
      this.model.aboutClient = this.checklist.AboutClient.Value ? 'yes' : 'no';
    }
  }

  async submitDetails() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    var previousAnswer = this.checklist.AboutClient.Value;
    this.checklist.AboutClient.Value = this.model.aboutClient === 'yes';
    if(!this.checklist.AboutClient.Value)
    {
      this.checklist.ClientNeedInterpreter.Value = undefined;
      this.checklist.ClientNeedInterpreter.IsValueSet = false;
    }
    this.checklist.AboutClient.IsValueSet = true;

    this.checklistSessionService.saveChecklist(this.checklist);
    var navigateUrl = this.getNavigateUrl(previousAnswer);
    if (this.editMode && !this.checklist.AboutClient.Value) {
      this.resetEditMode()
    }

    this.router.navigate([navigateUrl]);
  }

  getNavigateUrl(previousAnswer: boolean): string
  {
    var navigateUrl = "";

    if (this.editMode)
    {
      if (!this.checklist.AboutClient.Value || (previousAnswer === this.checklist.AboutClient.Value)) {
        navigateUrl =PageUrls.CheckYourAnswer;
      }
      else {
        navigateUrl = PageUrls.ClientNeedInterpreter;
      }

    }
    else
    {
      navigateUrl = this.checklist.AboutClient.Value ? PageUrls.ClientNeedInterpreter : PageUrls.SuitableRoom;

    }
    return navigateUrl;
  }
}
