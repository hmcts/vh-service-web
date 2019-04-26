import { IndividualSuitabilityModel, HasAccessToComputer, SuitabilityAnswer } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel implements IndividualSuitabilityModel {
    computer: HasAccessToComputer;
    interpreter: boolean;
    aboutYou: SuitabilityAnswer;
    internet: SuitabilityAnswer;
    room: SuitabilityAnswer;
    consent: SuitabilityAnswer;
}
