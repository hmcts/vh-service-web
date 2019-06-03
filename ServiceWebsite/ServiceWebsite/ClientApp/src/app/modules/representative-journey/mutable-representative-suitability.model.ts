import { RepresentativeSuitabilityModel } from './representative-suitability.model';
import { HasAccessToCamera, SuitabilityAnswer, Hearing } from '../base-journey/participant-suitability.model';

export class MutableRepresentativeSuitabilityModel extends RepresentativeSuitabilityModel {
    constructor() {
        super();
        this.aboutYou = new SuitabilityAnswer();
        this.aboutClient = new SuitabilityAnswer();
        this.hearingSuitability = new SuitabilityAnswer();
    }

    camera: HasAccessToCamera;
    computer: boolean;
    room: boolean;
    aboutYou: SuitabilityAnswer;
    aboutClient: SuitabilityAnswer;
    hearingSuitability: SuitabilityAnswer;
    hearing: Hearing;
}
