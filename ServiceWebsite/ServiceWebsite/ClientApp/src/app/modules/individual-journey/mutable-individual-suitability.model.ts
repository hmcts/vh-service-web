import { IndividualSuitabilityModel } from './individual-suitability.model';
import { HasAccessToCamera, SuitabilityAnswer, Hearing } from '../base-journey/participant-suitability.model';

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

    clone(): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        model.aboutYou = this.cloneAnswer(this.aboutYou);
        model.consent = this.cloneAnswer(this.consent);
        model.hearing = new Hearing(this.hearing.id, this.hearing.scheduleDateTime, this.hearing.caseName, this.hearing.caseNumber);
        model.camera = this.camera;
        model.computer = this.computer;
        model.internet = this.internet;
        model.interpreter = this.interpreter;
        model.room = this.room;
        return model;
    }

    private cloneAnswer(answer: SuitabilityAnswer) {
        return new SuitabilityAnswer(answer.answer, answer.notes);
    }
}
