export class SuitabilityAnswer {
    answer: boolean;
    notes: string;
}

export enum HasAccessToComputer {
    Yes,
    No,
    NotSure
}

export abstract class IndividualSuitabilityModel {
    computer: HasAccessToComputer;

    interpreter: boolean;

    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;
}
