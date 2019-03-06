import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { HearingService } from '../../services/hearing.service';
import { ProfileService } from '../../services/profile.service';
import { PageUrls } from '../../shared/page-url.constants';
import { SessionStorage } from '../../services/session-storage';
import { ChecklistEditBaseComponent } from '../../shared/checklist-base-component/checklist-edit-base.component';


@Component({
  selector: 'app-make-the-court-aware',
  templateUrl: './make-the-court-aware.component.html'
})
export class MakeTheCourtAwareComponent extends ChecklistEditBaseComponent implements OnInit {

  model: any = {
  };

  makeTheCourtAwareForm: FormGroup;
  courtAwareCheck = false;
  moreDetails: string;
  selectedAnswer: string;
  provideMoreInfo = false;

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
   
    this.makeTheCourtAwareForm = this.fb.group({
      courtAware: ['', [Validators.required]],
      moreDetails: ['', '']
    });
    this.makeTheCourtAwareForm.get('courtAware').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.courtAwareCheck = true;
    this.provideMoreInfo = true;
    const moredetailsControl = this.makeTheCourtAwareForm.get('moreDetails');
    if (this.makeTheCourtAwareForm.invalid) {
      if (this.selectedAnswer !== undefined &&
        this.selectedAnswer.toLowerCase() === 'yes' && moredetailsControl != null &&
        moredetailsControl.value === '') {
        this.provideMoreInfo = false;
      }
      return;
    }
    if (this.selectedAnswer.toLocaleLowerCase() === 'yes') {
      this.checklist.AbilityToTakePart.Value = true;
      let moredetailsControl = this.makeTheCourtAwareForm.get('moreDetails');
      this.checklist.AbilityToTakePart.Details = moredetailsControl.value.length > 0 ? moredetailsControl.value : null;
    } else {
      this.checklist.AbilityToTakePart.Value = false;
      this.checklist.AbilityToTakePart.Details = null;
    }
    this.checklist.AbilityToTakePart.IsValueSet = true;
    this.checklistSessionService.saveChecklist(this.checklist);
    if (this.editMode) {
      this.resetEditMode();
      this.router.navigate([PageUrls.CheckYourAnswer]);
    } else {
      this.router.navigate([PageUrls.Interpreter]);
    }
  }

  setAnswer(answer: string): void {
    const moredetailsControl = this.makeTheCourtAwareForm.get('moreDetails');
    if (answer.toLocaleLowerCase() === 'yes') {
      moredetailsControl.setValidators([Validators.required]);
    } else {
      moredetailsControl.clearValidators();
    }
    moredetailsControl.updateValueAndValidity();
    this.selectedAnswer = answer;
    this.courtAwareCheck = false;
    this.provideMoreInfo = true;
  }

  setData(): void {
    if (this.checklist.AbilityToTakePart.IsValueSet) {
      const savedAnswer = this.checklist.AbilityToTakePart.Value ? 'Yes' : 'No';
      this.makeTheCourtAwareForm.patchValue(
        {
          courtAware: savedAnswer,
          moreDetails: this.checklist.AbilityToTakePart.Details
        }
      );
    }
  }
}
