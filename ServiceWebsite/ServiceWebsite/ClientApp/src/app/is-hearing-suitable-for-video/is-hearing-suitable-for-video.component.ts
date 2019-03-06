import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { PageUrls } from '../shared/page-url.constants';
import { SessionStorage } from '../services/session-storage';
import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-is-hearing-suitable-for-video',
  templateUrl: './is-hearing-suitable-for-video.component.html'
})
export class IsHearingSuitableForVideoComponent extends ChecklistEditBaseComponent implements OnInit {

  model: any = {
  };

  isSuitableForm: FormGroup;
  suitabilityCheck = false;
  provideMoreInfo = false;
  moreDetails: string;
  selectedAnswer: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage) {
    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadHearingDetails().then(() => {
      this.setData();
    });
    this.isSuitableForm = this.fb.group({
      suitability: ['', [Validators.required]],
      moreDetails: ['', '']
    });
    this.isSuitableForm.get('suitability').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.suitabilityCheck = true;
    this.provideMoreInfo = true;
    const moredetailsControl = this.isSuitableForm.get('moreDetails');
    if (this.isSuitableForm.invalid) {
      if (this.selectedAnswer !== undefined && this.selectedAnswer.toLowerCase() === 'no' &&
        moredetailsControl != null && moredetailsControl.value === '') {
        this.provideMoreInfo = false;
      }
      return;
    }
    if (this.selectedAnswer.toLocaleLowerCase() === 'no') {
      this.checklist.IsHearingSuitableForVideo.Value = false;
      this.checklist.IsHearingSuitableForVideo.Details = moredetailsControl.value.length > 0 ? moredetailsControl.value : null;
    } else {
      this.checklist.IsHearingSuitableForVideo.Value = true;
      this.checklist.IsHearingSuitableForVideo.Details = null;
    }
    this.checklist.IsHearingSuitableForVideo.IsValueSet = true;
    this.checklistSessionService.saveChecklist(this.checklist);
    if (this.editMode) {
      this.resetEditMode();
      this.router.navigate([PageUrls.CheckYourAnswer]);
    } else {
      this.router.navigate([PageUrls.OtherInformation]);
    }
  }

  setAnswer(answer: string): void {
    const moredetailsControl = this.isSuitableForm.get('moreDetails');
    if (answer.toLocaleLowerCase() === 'no') {
      moredetailsControl.setValidators([Validators.required]);
    } else {
      moredetailsControl.clearValidators();
    }
    moredetailsControl.updateValueAndValidity();
    this.selectedAnswer = answer;
    this.suitabilityCheck = false;
    this.provideMoreInfo = true;
  }

  setData(): void {
    if (this.checklist.IsHearingSuitableForVideo.IsValueSet) {
      const savedAnswer = this.checklist.IsHearingSuitableForVideo.Value ? 'Yes' : 'No';
      this.isSuitableForm.patchValue({
        suitability: savedAnswer,
        moreDetails: this.checklist.IsHearingSuitableForVideo.Details
      });
    }
  }
}
