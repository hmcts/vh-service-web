export class ChecklistModel {

  constructor(hearingId: number, userId: string) {
    this.HearingId = hearingId;
    this.UserId = userId;
    this.CheckEquipment = [];
  }

  Consent: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  AbilityToTakePart: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  ClientNeedInterpreter: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  CheckEquipment: Array<CheckListEquipmentModel>;
  IsHearingSuitableForVideo: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  AboutClient: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  UseSameComputer: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  SuitableRoom: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);

  EquipmentPhone: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  EquipmentInternet: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  EquipmentLaptop: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);
  EquipmentComputerCamera: CheckListEquipmentModel;
  EquipmentNone: ChecklistYesNoQuestionModel = new ChecklistYesNoQuestionModel(false);

  OtherInformation: TextQuestionModel;

  HearingId: number;
  UserId: string;
}

export class ChecklistYesNoQuestionModel {

  public getAnswerAsString(): string { return this.Value ? 'yes' : 'no'; }

  constructor(defaultValue: boolean) {
    this.Value = defaultValue;
    this.IsValueSet = false;
  }

  Details: string;

  Value: boolean;

  yes() {
    this.Value = true;
  }

  no() {
    this.Value = false;
  }

  IsValueSet: boolean;
}

export class CheckListEquipmentModel {
  constructor(keyName: string, answer: string) {
    this.KeyName = keyName;
    this.Answer = answer;
  }
  KeyName: string;
  Answer: string;
}

export class TextQuestionModel {
  constructor(question: string, answer: string) {
    this.Question = question;
    this.Answer = answer;
  }
  Question: string;
  Answer: string;
}
