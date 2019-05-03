import { IndividualSuitabilityModel, HasAccessToCamera, SuitabilityAnswer, Hearing } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel extends IndividualSuitabilityModel {
    constructor() {
        super();
        this.aboutYou = new SuitabilityAnswer();
        this.consent = new SuitabilityAnswer();
    }

    camera: HasAccessToCamera;
    computer: boolean;
    internet: boolean;
    interpreter: boolean;
    room: boolean;
    aboutYou: SuitabilityAnswer;
    consent: SuitabilityAnswer;
    hearing: Hearing;
}
