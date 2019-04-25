export declare namespace IndividualSuitability {
    enum HasComputerAnswer {
        Yes,
        No,
        NotSure
    }

    class SuitabilityAnswerWithNotes {
        answer: boolean;
        notes: string;
    }
}

export abstract class IndividualSuitabilityModel {
    computer: IndividualSuitability.HasComputerAnswer;

    interpreter: boolean;

    aboutYou: IndividualSuitability.SuitabilityAnswerWithNotes;
    internet: IndividualSuitability.SuitabilityAnswerWithNotes;
    room: IndividualSuitability.SuitabilityAnswerWithNotes;
    consent: IndividualSuitability.SuitabilityAnswerWithNotes;
}
