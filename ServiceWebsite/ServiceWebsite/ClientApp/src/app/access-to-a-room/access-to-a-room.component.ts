import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { HearingService } from 'src/app/services/hearing.service';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { PageUrls } from 'src/app/shared/page-url.constants';
import { SessionStorage } from '../services/session-storage';
import { ChecklistEditBaseComponent } from '../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-access-to-a-room',
  templateUrl: './access-to-a-room.component.html'
})
export class AccessToARoomComponent extends ChecklistEditBaseComponent implements OnInit {
  roomAccessForm: FormGroup;
  submitted = false;
  selectedAnswer: string;
  model: any = {
  };

  constructor(private router: Router,
    private fb: FormBuilder,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage) {

    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit(): void {

    super.ngOnInit();
    this.loadHearingDetails().then(() => {
      this.setData();
    });

    this.roomAccessForm = this.fb.group({
      roomAccess: ['', [Validators.required]],
    });

    this.roomAccessForm.get('roomAccess').valueChanges
      .subscribe(value => this.setAnswer(value));
  }

  continue(): void {
    this.submitted = true;
    if (this.roomAccessForm.invalid) {
      return;
    }

    if (this.selectedAnswer.toLocaleLowerCase() === 'yes') {
      this.checklist.SuitableRoom.Value = true;
    } else {
      this.checklist.SuitableRoom.Value = false;
    }
    this.checklist.SuitableRoom.IsValueSet = true;
    this.checklistSessionService.saveChecklist(this.checklist);

    if (this.editMode) {
      this.resetEditMode();
      this.router.navigate([PageUrls.CheckYourAnswer]);
    } else {
      if (this.isProfessional) {
        this.router.navigate([PageUrls.AbilityToTakePart]);
      } else {
        this.router.navigate([PageUrls.CitizenEquipment]);
      }
    }
  }

  setAnswer(selectedAnswer: string): void {
    this.selectedAnswer = selectedAnswer;
  }

  setData(): void {
    if (this.checklist.SuitableRoom.IsValueSet) {
      const savedAnswer = this.checklist.SuitableRoom.Value ? 'Yes' : 'No';
      this.roomAccessForm.patchValue({ roomAccess: savedAnswer });
    }
  }
}
