import { ChecklistModel, TextQuestionModel } from 'src/app/models/checklist.model';

export class MockChecklistSessionService {
    getChecklist(hearingId: number, userId: string): ChecklistModel {
        const checklist = new ChecklistModel(hearingId, userId);
        checklist.OtherInformation = new TextQuestionModel('question', 'answer');
        return checklist;
    }
    saveChecklist(checklist: ChecklistModel) { }
}
