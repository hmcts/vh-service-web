import { IndividualSuitabilityModel, SuitabilityAnswer } from './individual-suitability.model';

export class MutableIndividualSuitabilityModel extends IndividualSuitabilityModel {
    constructor() {
        super();
        this.aboutYou = new SuitabilityAnswer();
        this.consent = new SuitabilityAnswer();
        this.internet = new SuitabilityAnswer();
        this.room = new SuitabilityAnswer();
    }
}
