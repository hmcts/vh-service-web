import { IndividualSuitabilityModel, HasAccessToComputer, SuitabilityAnswer, Hearing } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel implements IndividualSuitabilityModel {
    hearing: Hearing;
    computer: HasAccessToComputer;
    interpreter: boolean;
    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;
}
