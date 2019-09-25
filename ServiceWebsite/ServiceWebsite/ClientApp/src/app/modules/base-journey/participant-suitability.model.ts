export class SuitabilityAnswer {
  answer: boolean;
  notes: string;
}

export class MediaAccessResponse {
  result: boolean;
  exceptionType: string;
}

export class SelfTestAnswers {
  constructor(answers?: {
    seeAndHearClearly?: boolean,
    checkYourComputer?: boolean,
    cameraWorking?: boolean,
    microphoneWorking?: boolean,
    selfTestResultScore?: string
  }) {
    if (answers) {
      this.seeAndHearClearly = answers.seeAndHearClearly;
      this.checkYourComputer = answers.checkYourComputer;
      this.cameraWorking = answers.cameraWorking;
      this.microphoneWorking = answers.microphoneWorking;
      this.selfTestResultScore = answers.selfTestResultScore;
    }
  }

  seeAndHearClearly: boolean;
  checkYourComputer: boolean;
  cameraWorking: boolean;
  microphoneWorking: boolean;
  selfTestResultScore: string;

  isCompleted() {
    return this.seeAndHearClearly !== undefined
      && this.checkYourComputer !== undefined
      && this.cameraWorking !== undefined
      && this.microphoneWorking !== undefined
      && this.selfTestResultScore !== undefined;
  }
}

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class ParticipantSuitabilityModel {
  mediaAccepted: boolean;
  mediaSwitchedOn: boolean;
  selfTest: SelfTestAnswers;
  hearing: Hearing;
  participantId: string;

  isUpcoming(): boolean {
    const now = new Date();
    return this.hearing.scheduleDateTime >= now;
  }
}

export class Hearing {
  constructor(id?: string, scheduledDateTime?: Date, caseName?: string, caseNumber?: string, questionnaireNotRequired?: boolean) {
    this.id = id;
    this.scheduleDateTime = scheduledDateTime;
    this.caseName = caseName;
    this.caseNumber = caseNumber;
    this.questionnaireNotRequired = questionnaireNotRequired;
  }
  id: string;
  scheduleDateTime: Date;
  caseName: string;
  caseNumber: string;
  questionnaireNotRequired: boolean;
}
