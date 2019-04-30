import { HasAccessToCamera, Hearing } from './../individual-suitability.model';
import { IndividualSuitabilityModel, SuitabilityAnswer } from '../individual-suitability.model';
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
        model.internet = this.mapInternet(response.answers);
        model.room = this.mapRoom(response.answers);
        model.interpreter = this.mapInterpreter(response.answers);
        model.camera = this.mapComputerCamera(response.answers);
        model.computer = this.mapComputer(response.answers);
        return model;
    }
    private mapInterpreter(answers: HearingSuitabilityAnswer[]): boolean {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Interpreter);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }
    private mapComputer(answers: HearingSuitabilityAnswer[]): boolean {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Computer);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }
    private mapInternet(answers: HearingSuitabilityAnswer[]): boolean {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Internet);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }
    private mapRoom(answers: HearingSuitabilityAnswer[]): boolean {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Room);
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
