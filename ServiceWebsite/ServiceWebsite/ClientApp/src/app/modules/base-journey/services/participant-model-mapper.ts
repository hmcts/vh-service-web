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

}
