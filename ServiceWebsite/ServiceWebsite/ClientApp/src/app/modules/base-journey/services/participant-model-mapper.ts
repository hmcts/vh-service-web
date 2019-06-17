import { HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { SuitabilityAnswer, HasAccessToCamera } from '../participant-suitability.model';

export const ParticipantQuestionKeys = {
    Camera: 'CAMERA_MICROPHONE'
};

export abstract class ParticipantModelMapper {

    public mapBooleanValue(answers: HearingSuitabilityAnswer[], key: string) {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }

    public mapComputerCamera(answers: HearingSuitabilityAnswer[]): HasAccessToCamera {
        const answer = answers.find(a => a.question_key === ParticipantQuestionKeys.Camera);
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

    public mapBooleanAnswerFromKey(key: string, answers: HearingSuitabilityAnswer[]): SuitabilityAnswer {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return this.answer(answer.answer, answer.extended_answer);
        }
        return new SuitabilityAnswer();
    }

    public answer(value: string, notes: string): SuitabilityAnswer {
        const answer = new SuitabilityAnswer();
        answer.answer = value === 'true';
        answer.notes = notes;
        return answer;
    }

    public addSuitabilityAnswer(modelAnswer: SuitabilityAnswer, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            answers.push(this.createHearingSuitabilityAnswer(key, modelAnswer.answer, modelAnswer.notes));
        }
    }

    public addBooleanAnswer(modelAnswer: boolean, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            answers.push(this.createHearingSuitabilityAnswer(key, modelAnswer, null));
        }
    }

    public addAnswerForCamera(modelAnswer: HasAccessToCamera, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            const answer = new HearingSuitabilityAnswer();
            answer.question_key = key;
            answer.answer = this.getAccessToCameraAnswer(modelAnswer);
            answers.push(answer);
        }
    }

    private createHearingSuitabilityAnswer(key: string, answer: boolean, extendedAnswer: string): HearingSuitabilityAnswer {
        const hearingSuitabilityAnswer = new HearingSuitabilityAnswer();
        hearingSuitabilityAnswer.question_key = key;
        hearingSuitabilityAnswer.answer = answer ? 'Yes' : 'No';
        if (extendedAnswer !== null) {
            hearingSuitabilityAnswer.extended_answer = extendedAnswer;
        }
        return hearingSuitabilityAnswer;
    }

    private getAccessToCameraAnswer(accessToCamera: HasAccessToCamera) {
        switch (accessToCamera) {
            case HasAccessToCamera.Yes:
                return 'Yes';
            case HasAccessToCamera.No:
                return 'No';
            case HasAccessToCamera.NotSure:
                return 'Not sure';
            default:
                throw new Error(`Unexpected answer to computer question: ${accessToCamera}`);
        }
    }
}
