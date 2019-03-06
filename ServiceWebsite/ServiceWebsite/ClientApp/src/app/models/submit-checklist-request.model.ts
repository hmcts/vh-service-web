export class SubmitChecklistRequestModel {
    user_id: string;
    hearing_id: number;
    answers: ChecklistAnswerModel[] = new Array<ChecklistAnswerModel>();

    addAnswer(key: string, answer: string, notes: string = null) {
        this.answers.push(new ChecklistAnswerModel(key, answer, notes));
    }
}

export class ChecklistAnswerModel {

    constructor(question: string, answer: string, notes: string = null) {
        this.question = question;
        this.answer = answer;
        this.notes = notes;
    }

    question: string;
    answer: string;
    notes: string;
}
