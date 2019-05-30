import { SuitabilityAnswer, HasAccessToCamera, Hearing } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';

export const IndividualQuestionKeys = {
    AboutYou: 'ABOUT_YOU',
    Consent: 'CONSENT',
    Room: 'ROOM',
    Internet: 'INTERNET',
    Interpreter: 'INTERPRETER',
    Computer: 'COMPUTER',
    Camera: 'CAMERA_MICROPHONE'
};

export class IndividualModelMapper {
    map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.consent = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.internet = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Internet);
        model.room = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Room);
        model.interpreter = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Interpreter);
        model.computer = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Computer);
        model.camera = this.mapComputerCamera(response.answers);
        return model;
    }
    private mapBooleanValue(answers: HearingSuitabilityAnswer[], key: string) {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }
    private mapComputerCamera(answers: HearingSuitabilityAnswer[]): HasAccessToCamera {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Camera);
        if (answer) {
            switch (answer.answer) {
                case 'Yes':
                    return HasAccessToCamera.Yes;
                case 'No':
                    return HasAccessToCamera.No;
                case 'Not sure':
                    return HasAccessToCamera.NotSure;
                default:
                    throw new Error(`Unexpected answer to computer question: ${answer.answer}`);
            }
        }
        return undefined;
    }
    private mapBooleanAnswerFromKey(key: string, answers: HearingSuitabilityAnswer[]): SuitabilityAnswer {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return this.answer(answer.answer, answer.extended_answer);
        }
        return new SuitabilityAnswer();
    }
    private answer(value: string, notes: string): SuitabilityAnswer {
        const answer = new SuitabilityAnswer();
        answer.answer = value === 'true';
        answer.notes = notes;
        return answer;
    }
}
