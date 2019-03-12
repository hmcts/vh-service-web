import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUrls } from '../shared/page-url.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistModel } from 'src/app/models/checklist.model';
import { ChecklistService } from 'src/app/services/checklist.service';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { Hearing } from 'src/app/models/hearing.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { HearingService } from 'src/app/services/hearing.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LocaleResources } from 'src/app/shared/resources/locale-resources';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-use-same-computer',
  templateUrl: './use-same-computer.component.html'
})
export class UseSameComputerComponent implements OnInit {
  sameComputerForm: FormGroup;
  submitted = false;
  selectedAnswer: string;
  checklist: ChecklistModel;
  userProfile: UserProfile;
  model: any = {
  };
  localeResources: any;

  constructor(private router: Router, private fb: FormBuilder, private hearingDetails: HearingService,
    private checklistService: ChecklistService, private profileService: ProfileService,
    private checklistSession: ChecklistSessionService) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit(): void {
    this.hearingDetails.getNextHearingDetails()
      .then(details => this.loadChecklist(details));

    this.sameComputerForm = this.fb.group({
      sameComputer: ['', [Validators.required]],
    });

    this.sameComputerForm.get('sameComputer').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  async loadChecklist(hearingDetails: Hearing) {
    const userProfile = await this.profileService.getUserProfile();
    this.checklist = this.checklistSession.getChecklist(hearingDetails.id, userProfile.email);
    // this.checklistSession.saveChecklist(this.checklist);
    this.setData();
  }

  continue(): void {
    this.submitted = true;
    if (this.sameComputerForm.invalid) {
      return;
    }

    if (this.selectedAnswer.toLocaleLowerCase() === 'yes') {
      this.checklist.UseSameComputer.Value = true;
      this.checklist.UseSameComputer.IsValueSet = true;
      this.checklistSession.saveChecklist(this.checklist);

      this.router.navigate([PageUrls.AboutYourEquipment]);
    } else {
      this.checklist.UseSameComputer.Value = false;
      this.checklist.UseSameComputer.IsValueSet = true;
      this.checklistSession.saveChecklist(this.checklist);

      this.router.navigate([PageUrls.CitizenEquipment]);
    }
  }

  setAnswer(selectedAnswer: string): void {
    this.selectedAnswer = selectedAnswer;
  }

  setData(): void {
    if (this.checklist.UseSameComputer.IsValueSet) {
      const savedAnswer = this.checklist.UseSameComputer.Value ? 'Yes' : 'No';
      this.sameComputerForm.patchValue(
        {
          sameComputer: savedAnswer
        }
      );
    }
  }
}
