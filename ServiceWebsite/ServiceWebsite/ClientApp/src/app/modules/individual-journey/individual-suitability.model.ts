export class SuitabilityAnswer {
    answer: boolean;
    notes: string;
}

export enum HasAccessToCamera {
    Yes,
    No,
    NotSure
}

/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class IndividualSuitabilityModel {
    camera: HasAccessToCamera;

    computer: boolean;
    internet: boolean;
    interpreter: boolean;
    room: boolean;

    aboutYou: SuitabilityAnswer;
    consent: SuitabilityAnswer;
}
