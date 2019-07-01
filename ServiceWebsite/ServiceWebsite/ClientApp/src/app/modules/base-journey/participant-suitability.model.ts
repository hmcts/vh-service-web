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
        sameComputer?: boolean,
        cameraWorking?: boolean,
        microphoneWorking?: boolean
    }) {
        if (answers) {
            this.seeAndHearClearly = answers.seeAndHearClearly;
            this.sameComputer = answers.sameComputer;
            this.cameraWorking = answers.cameraWorking;
            this.microphoneWorking = answers.microphoneWorking;
        }
    }

    seeAndHearClearly: boolean;
    sameComputer: boolean;
    cameraWorking: boolean;
    microphoneWorking: boolean;
}


/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class ParticipantSuitabilityModel {
    aboutYou: SuitabilityAnswer;
    camera: HasAccessToCamera;
    computer: boolean;
    room: boolean;

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
