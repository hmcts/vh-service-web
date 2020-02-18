import { ParticipantSuitabilityModel, SuitabilityAnswer } from '../base-journey/participant-suitability.model';

export enum PresentingTheCase {
    IWillBePresentingTheCase,
    SomeoneWillBePresenting,
}

export class PresentingCaseDetails {
    constructor(details?: {
        fullName?: string,
        email?: string
    }) {
        if (details) {
            this.fullName = details.fullName;
            this.email = details.email;
        }
    }

    fullName: string;
    email: string;
}
/**
 * Exposes the basic properties of the suitability model.
 */
export abstract class RepresentativeSuitabilityModel extends ParticipantSuitabilityModel {
    otherInformation: SuitabilityAnswer;

    presentingTheCase: PresentingTheCase;
    presentingCaseDetails: PresentingCaseDetails;
    checkYourAnswers: boolean;

    isCompleted(): boolean {
        return this.selfTest !== undefined && this.selfTest.isCompleted();
    }
}
