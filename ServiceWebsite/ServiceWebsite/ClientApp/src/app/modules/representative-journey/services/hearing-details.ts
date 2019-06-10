export class HearingDetails {
    readonly id: string;
    readonly scheduledDateTime: Date;
    readonly caseNumber: string;
    readonly caseName: string;
    readonly caseType: string;

    constructor(id: string, caseName: string, caseNumber: string, caseType: string, scheduledDateTime: Date) {
        this.id = id;
        this.caseName = caseName;
        this.caseNumber = caseNumber;
        this.caseType = caseType;
        this.scheduledDateTime = scheduledDateTime;
    }
}

