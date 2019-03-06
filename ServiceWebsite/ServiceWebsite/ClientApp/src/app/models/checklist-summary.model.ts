export class ChecklistSummaryModel {
  constructor(question, answer, routerLink, showTextAnswer) {
    this.Answer = answer;
    this.Question = question;
    this.RouterLink = routerLink;
    this.ShowTextAnswer = showTextAnswer;
   }

  Question: string;
  Answer: string;
  RouterLink: string;
  ShowTextAnswer: boolean;
}
