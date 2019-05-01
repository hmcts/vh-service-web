import { IndividualSuitabilityModel, HasAccessToCamera, SuitabilityAnswer, Hearing } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel implements IndividualSuitabilityModel {
    camera: HasAccessToCamera;
    computer: boolean;
    internet: boolean;
    interpreter: boolean;
    room: boolean;
    aboutYou: SuitabilityAnswer;
    consent: SuitabilityAnswer;
    hearing: Hearing;
}
