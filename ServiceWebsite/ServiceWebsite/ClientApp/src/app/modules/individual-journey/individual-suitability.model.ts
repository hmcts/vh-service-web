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
}