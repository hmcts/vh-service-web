import { Component, OnInit } from '@angular/core';
import { SessionStorage } from '../../services/session-storage';
import { Constants } from '../constants';
import { HearingService } from '../../services/hearing.service';
import { ProfileService } from '../../services/profile.service';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { ChecklistBaseComponent } from '../checklist-base-component/checklist-base.component';

export abstract class ChecklistEditBaseComponent extends ChecklistBaseComponent implements OnInit {

  buttonAction: string;
  editMode = false;

  constructor(protected sessionStorage: SessionStorage,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService) {
    super(hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    const editModeParameter = this.sessionStorage.getItem(Constants.LocalStorageKeys.EditModeChecklist);
    this.editMode = editModeParameter === 'true';
    this.buttonAction = this.editMode ? this.localeResources.Save : this.localeResources.Continue;
  }

  resetEditMode() {
    this.editMode = false;
    this.sessionStorage.setItem(Constants.LocalStorageKeys.EditModeChecklist, 'false');
  }
}
