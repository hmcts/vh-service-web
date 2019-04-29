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
    hearing: Hearing;

    computer: HasAccessToComputer;

    interpreter: boolean;

    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;

    isUpcoming(): boolean {
        const now = new Date();
        return this.hearing.scheduleDateTime >= now;
    }
}

export class Hearing {
    constructor(id?: string, scheduledDateTime?: Date) {
        this.id = id;
        this.scheduleDateTime = scheduledDateTime;
    }

    id: string;
    scheduleDateTime: Date;
}
