import { IndividualSuitabilityModel, HasAccessToComputer, SuitabilityAnswer, Hearing } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel implements IndividualSuitabilityModel {
    computer: HasAccessToComputer;
    interpreter: boolean;
    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;
    hearing: Hearing;
}