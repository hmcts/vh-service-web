import { SuitabilityAnswer, HasAccessToCamera, Hearing } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';

export const RepresentativeQuestionKeys = {
    AboutYou: 'ABOUT_YOU',
    AboutYourClient: 'ABOUT_YOUR_CLIENT',
    ClientAttendance: 'CLIENT_ATTENDANCE',
    HearingSuitability: 'HEARING_SUITABILITY',
    Room: 'ROOM',
    Camera: 'CAMERA_MICROPHONE',
    Computer: 'COMPUTER'
};

export class RepresentativeModelMapper {
    map(response: HearingSuitabilityResponse): RepresentativeSuitabilityModel {
        const model = new MutableRepresentativeSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.AboutYou, response.answers);
        model.aboutClient = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.AboutYourClient, response.answers);
        model.clientAttenance = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.ClientAttendance);
        model.hearingSuitability = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.HearingSuitability, response.answers);
        model.room = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.Room);
        model.camera = this.mapComputerCamera(response.answers);
        model.computer = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.Computer);
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
        const answer = answers.find(a => a.question_key === RepresentativeQuestionKeys.Camera);
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
