import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { PageUrls } from '../shared/page-url.constants';
import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';
import { SessionStorage } from '../services/session-storage';

@Component({
  selector: 'app-will-client-need-interpreter',
  templateUrl: './will-client-need-interpreter.component.html',
})
export class WillClientNeedInterpreterComponent extends ChecklistEditBaseComponent implements OnInit {
  model: any = {
  };
  needInterpreterForm: FormGroup;
  needInterpreterCheck = false;
  moredetails: string;
  selectedAnswer: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage
  ) {
    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {

    super.ngOnInit();
    this.loadHearingDetails().then(() => {
      this.setData();
    });
    this.needInterpreterForm = this.fb.group({
      needInterpreter: ['', [Validators.required]],
    });
    this.needInterpreterForm.get('needInterpreter').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.needInterpreterCheck = true;
    if (this.needInterpreterForm.invalid) {
      return;
    }
    if (this.selectedAnswer.toLocaleLowerCase() === 'yes') {
      this.checklist.ClientNeedInterpreter.Value = true;
    } else {
      this.checklist.ClientNeedInterpreter.Value = false;
    }
    this.checklist.ClientNeedInterpreter.IsValueSet = true;
    this.checklistSessionService.saveChecklist(this.checklist);
    if (this.editMode) {
      this.resetEditMode();
      this.router.navigate([PageUrls.CheckYourAnswer]);
    } else {
      this.router.navigate([PageUrls.SuitableRoom]);
    }
  }

  setAnswer(answer: string): void {
    this.selectedAnswer = answer;
    this.needInterpreterCheck = false;
  }

  setData(): void {
    if (this.checklist.ClientNeedInterpreter.IsValueSet) {
      const savedAnswer = this.checklist.ClientNeedInterpreter.Value ? 'Yes' : 'No';
      this.needInterpreterForm.patchValue({ needInterpreter: savedAnswer });
    }
  }
}
