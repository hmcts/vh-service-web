import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { PageUrls } from '../shared/page-url.constants';
import { SessionStorage } from '../services/session-storage';
import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-ability-to-take-part',
  templateUrl: './ability-to-take-part.component.html'
})
export class AbilityToTakePartComponent extends ChecklistEditBaseComponent implements OnInit {

  abilityForm: FormGroup;
  abilityCheck = false;
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
    this.abilityForm = this.fb.group({
      ability: ['', [Validators.required]],
      moreDetails: ['', '']
    });

    this.abilityForm.get('ability').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.abilityCheck = true;
    this.provideMoreInfo = true;
    const moredetailsControl = this.abilityForm.get('moreDetails');
    if (this.abilityForm.invalid) {
      if (this.selectedAnswer !== undefined &&
        this.selectedAnswer.toLowerCase() === 'yes' && moredetailsControl != null &&
        moredetailsControl.value === '') {
        this.provideMoreInfo = false;
      }
      return;
    }
    if (this.selectedAnswer.toLocaleLowerCase() === 'yes') {
      this.checklist.AbilityToTakePart.Value = true;
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
      this.router.navigate([PageUrls.IsHearingSuitableForVideo]);
    }
  }

  setAnswer(answer: string): void {
    const moredetailsControl = this.abilityForm.get('moreDetails');
    if (answer.toLocaleLowerCase() === 'yes') {
      moredetailsControl.setValidators([Validators.required]);
    } else {
      moredetailsControl.clearValidators();
    }
    moredetailsControl.updateValueAndValidity();
    this.selectedAnswer = answer;
    this.abilityCheck = false;
    this.provideMoreInfo = true;
  }

  setData(): void {
    if (this.checklist.AbilityToTakePart.IsValueSet) {
      const savedAnswer = this.checklist.AbilityToTakePart.Value ? 'Yes' : 'No';
      this.abilityForm.patchValue({
        ability: savedAnswer,
        moreDetails: this.checklist.AbilityToTakePart.Details
      });
    }
  }
}
