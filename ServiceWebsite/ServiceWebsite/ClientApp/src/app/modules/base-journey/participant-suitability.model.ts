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
export abstract class ParticipantSuitabilityModel {
    aboutYou: SuitabilityAnswer;
    camera: HasAccessToCamera;
    computer: boolean;
    room: boolean;
    hearing: Hearing;

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
