export class SuitabilityAnswer {
  answer: boolean;
  notes: string;
}

export enum HasAccessToCamera {
  Yes,
  No,
  NotSure
}

export class SelfTestAnswers {
  constructor(answers?: {
    seeAndHearClearly?: boolean,
    checkYourComputer?: boolean,
    cameraWorking?: boolean,
    microphoneWorking?: boolean,
    selfTestResultScore?:string
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
  aboutYou: SuitabilityAnswer;
  camera: HasAccessToCamera;
  computer: boolean;
  room: boolean;
  mediaAccepted: boolean;
  mediaSwitchedOn: boolean;
  selfTest: SelfTestAnswers;

  hearing: Hearing;

  isUpcoming(): boolean {
    const now = new Date();
    return this.hearing.scheduleDateTime >= now;
  }
}

export class Hearing {
  constructor(id?: string, scheduledDateTime?: Date, caseName?: string, caseNumber?: string) {
    this.id = id;
    this.scheduleDateTime = scheduledDateTime;
    this.caseName = caseName;
    this.caseNumber = caseNumber;
  }
  id: string;
  scheduleDateTime: Date;
  caseName: string;
  caseNumber: string;
}
