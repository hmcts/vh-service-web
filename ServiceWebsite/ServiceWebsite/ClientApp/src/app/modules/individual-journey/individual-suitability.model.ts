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
}

export class Hearing {
    constructor(id?: string) {
        this.id = id;
    }

    id: string;
}
