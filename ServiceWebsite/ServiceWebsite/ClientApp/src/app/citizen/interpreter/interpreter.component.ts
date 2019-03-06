import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { HearingService } from '../../services/hearing.service';
import { ProfileService } from '../../services/profile.service';
import { PageUrls } from '../../shared/page-url.constants';
import { SessionStorage } from '../../services/session-storage';
import { ChecklistEditBaseComponent } from '../../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css'],
})
export class InterpreterComponent extends ChecklistEditBaseComponent implements OnInit {
  model: any = {
  };
  needInterpreterForm: FormGroup;
  needInterpreter: FormControl;
  needInterpreterCheck = false;
  moredetails: string;
  selectedAnswer: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage) {
    super(sessionStorage, hearingService, profileService, checklistSessionService );
  }

  ngOnInit() {
    super.ngOnInit();
    
    this.loadHearingDetails().then(() => {
      this.resetAnswer();
    });
    this.needInterpreter = new FormControl('', Validators.required);
    this.needInterpreterForm = this.fb.group({
      needInterpreter: this.needInterpreter,
    });
    this.needInterpreterForm.get('needInterpreter').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  resetAnswer() {
    if (this.checklist.ClientNeedInterpreter.IsValueSet) {
      let valueToset = this.checklist.ClientNeedInterpreter.Value ? 'Yes' : 'No';
      this.needInterpreterForm.patchValue({ needInterpreter: valueToset });
    }
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
}
