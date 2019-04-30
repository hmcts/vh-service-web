export class SuitabilityAnswer {
    answer: boolean;
    notes: string;
}

export enum HasAccessToComputer {
    Yes,
    No,
    NotSure
}

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class IndividualSuitabilityModel {
    computer: HasAccessToComputer;

    interpreter: boolean;

    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;

    hearing: Hearing;
}

export class Hearing {
    constructor(id?: string, scheduledDateTime?: Date) {
        this.id = id;
        this.scheduleDateTime = scheduledDateTime;
    }
    id: string;
    scheduleDateTime: Date;
}
