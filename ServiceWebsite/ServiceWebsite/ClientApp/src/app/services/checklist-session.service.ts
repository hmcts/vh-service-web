import { Injectable } from '@angular/core';
import { ChecklistModel } from '../models/checklist.model';
import { SessionStorage } from './session-storage';

const checklistModelKey = 'Checklist';

@Injectable()
export class ChecklistSessionService {

    constructor(private sessionStorage: SessionStorage) { }

    // Save the checklist to local storage
    saveChecklist(checklist: ChecklistModel) {
        this.sessionStorage.setObject(checklistModelKey, checklist);
    }

    // Get, if existing, a checklist from local storage. If none exists, an empty one is created
    getChecklist(hearingId: number, userId: string): ChecklistModel {
        const model = this.sessionStorage.getObject<ChecklistModel>(checklistModelKey);
        if (model) {
            // TODO: Rethink this, do we set this here or at time of posting?
            model.HearingId = hearingId;
            model.UserId = userId;
            return model;
        }

        return new ChecklistModel(hearingId, userId);
  }

  isChecklistInStorage(): boolean {
    const checkList = this.sessionStorage.tryGetObject<ChecklistModel>(checklistModelKey);
    return checkList !== null;
  }

    // clears the hearing data and the checklist answers.
    clearCheckList() {
        this.sessionStorage.removeItem(checklistModelKey);
    }
}
