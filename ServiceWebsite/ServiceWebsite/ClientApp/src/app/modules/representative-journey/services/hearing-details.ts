export class HearingDetails {
    readonly scheduledDateTime: Date;
    readonly caseNumber: string;
    readonly caseName: string;
    readonly caseType: string;

    constructor(caseName: string, caseNumber: string, caseType: string, scheduledDateTime: Date) {
        this.caseName = caseName;
        this.caseNumber = caseNumber;
        this.caseType = caseType;
        this.scheduledDateTime = scheduledDateTime;
    }
}

