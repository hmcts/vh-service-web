import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { HearingService } from 'src/app/services/hearing.service';
import { PageUrls } from 'src/app/shared/page-url.constants';
import { SessionStorage } from '../../services/session-storage';
import { ChecklistEditBaseComponent } from '../../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html'
})
export class ConsentComponent extends ChecklistEditBaseComponent  implements OnInit {

  consentForm: FormGroup;
  consentCheck = false;
  provideMoreInfo = false;
  moreDetails: string;
  selectedAnswer: string;

  constructor(
    private router: Router,
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

    this.consentForm = this.fb.group({
      consent: ['', [Validators.required]],
      moreDetails: ['', '']
    });

    this.consentForm.get('consent').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.consentCheck = true;
    this.provideMoreInfo = true;
    const moreDetailsControl = this.consentForm.get('moreDetails');
    if (this.consentForm.invalid) {
      if (this.selectedAnswer !== undefined &&
        this.selectedAnswer.toLowerCase() === 'no' && moreDetailsControl != null &&
        moreDetailsControl.value === '') {
        this.provideMoreInfo = false;
      }
      return;
    }
    if (this.selectedAnswer.toLocaleLowerCase() === 'no') {
      this.checklist.Consent.Value = false;
      this.checklist.Consent.Details = moreDetailsControl.value.length > 0 ? moreDetailsControl.value : null;
    } else {
      this.checklist.Consent.Value = true;
      this.checklist.Consent.Details = null;
    }
    this.checklist.Consent.IsValueSet = true;
    this.checklistSessionService.saveChecklist(this.checklist);
    this.resetEditMode();
    this.router.navigate([PageUrls.CheckYourAnswer]);
  }

  setAnswer(answer: string): void {
    const moreDetailsControl = this.consentForm.get('moreDetails');
    if (answer.toLocaleLowerCase() === 'no') {
      moreDetailsControl.setValidators([Validators.required]);
    } else {
      moreDetailsControl.clearValidators();
    }
    moreDetailsControl.updateValueAndValidity();
    this.selectedAnswer = answer;
    this.consentCheck = false;
    this.provideMoreInfo = true;
  }

  setData(): void {
    if (this.checklist.Consent.IsValueSet) {
      const savedAnswer = this.checklist.Consent.Value ? 'Yes' : 'No';
      this.consentForm.patchValue(
        {
          consent: savedAnswer,
          moreDetails: this.checklist.Consent.Details
        }
      );
    }
  }
}
