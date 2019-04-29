import { IndividualSuitabilityModel, HasAccessToComputer, SuitabilityAnswer, Hearing } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel extends IndividualSuitabilityModel {
    hearing: Hearing;
    computer: HasAccessToComputer;
    interpreter: boolean;
    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;
}
