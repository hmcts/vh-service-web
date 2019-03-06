import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';
import { SessionStorage } from '../services/session-storage';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { Hearing } from '../models/hearing.model';
import { TextQuestionModel, ChecklistModel } from '../models/checklist.model';
import { UserProfile } from '../models/user-profile.model';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Constants } from '../shared/constants';


@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html'
})
export class OtherInformationComponent extends ChecklistEditBaseComponent implements OnInit {

  checklist: ChecklistModel;
  questionAnswer: TextQuestionModel;
  hearingDetails: Hearing;
  userProfile: UserProfile;

  otherInfoForm: FormGroup;
  otherInfo: string;

  constructor(
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage,
    private formBuilder: FormBuilder,
    private router: Router) {

    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initialiseChecklist();
  }

  initialiseChecklist() {
    this.hearingService.getNextHearingDetails()
      .then(details => {
        this.hearingDetails = details;
        this.profileService.getUserProfile().then(profile => {
          this.userProfile = profile;
          this.checklist = this.checklistSessionService.getChecklist(details.id, profile.email);
          this.loadPreviousAnswer();
        });
      });

    this.otherInfoForm = this.formBuilder.group({
      otherInfo: ['', '']
    });
  }

  private loadPreviousAnswer(): void {
    if (this.checklist.OtherInformation && this.checklist.OtherInformation.Answer) {
      this.otherInfoForm.patchValue({ otherInfo: this.checklist.OtherInformation.Answer });
    }
  }

  continue(): void {
    const otherInfoAnswer = this.otherInfoForm.get('otherInfo').value;
    this.checklist.OtherInformation = new TextQuestionModel(Constants.LocalStorageKeys.OtherInformation, otherInfoAnswer);
    this.checklistSessionService.saveChecklist(this.checklist);
    this.resetEditMode();
    this.router.navigate([this.pageUrl.CheckYourAnswer]);
  }
}
