import { SuitabilityAnswer, HasAccessToCamera, Hearing } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const IndividualQuestionKeys = {
    AboutYou: 'ABOUT_YOU',
    Consent: 'CONSENT',
    Room: 'ROOM',
    Internet: 'INTERNET',
    Interpreter: 'INTERPRETER',
    Computer: 'COMPUTER',
    Camera: 'CAMERA_MICROPHONE'
};

export class IndividualModelMapper extends ParticipantModelMapper {

    map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.consent = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.Consent, response.answers);
        model.internet = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Internet);
        model.room = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Room);
        model.interpreter = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Interpreter);
        model.computer = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Computer);
        model.camera = this.mapComputerCamera(response.answers);

        model.isDone = response.answers.length > 0;
        return model;
    }

    mapToRequest(model: MutableIndividualSuitabilityModel): HearingSuitabilityAnswer[] {
        const answers: HearingSuitabilityAnswer[] = [];
        this.addSuitabilityAnswer(model.aboutYou, IndividualQuestionKeys.AboutYou, answers);
        this.addSuitabilityAnswer(model.consent, IndividualQuestionKeys.Consent, answers);
        this.addBooleanAnswer(model.internet, IndividualQuestionKeys.Internet, answers);
        this.addBooleanAnswer(model.room, IndividualQuestionKeys.Room, answers);
        this.addBooleanAnswer(model.interpreter, IndividualQuestionKeys.Interpreter, answers);
        this.addBooleanAnswer(model.computer, IndividualQuestionKeys.Computer, answers);
        this.addAnswerForCamera(model.camera, IndividualQuestionKeys.Camera, answers);
        return answers;
    }
}
