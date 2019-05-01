import { HasAccessToComputer, Hearing } from './../individual-suitability.model';
import { IndividualSuitabilityModel, SuitabilityAnswer } from '../individual-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';

export const IndividualQuestionKeys = {
    AboutYou: 'ABOUT_YOU',
    Consent: 'CONSENT',
    Room: 'ROOM',
    Internet: 'INTERNET',
    Interpreter: 'INTERPRETER',
    Computer: 'COMPUTER'
};

export class IndividualModelMapper {
    map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.consent = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.internet = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.room = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.interpreter = this.mapInterpreter(response.answers);
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
    private mapComputer(answers: HearingSuitabilityAnswer[]): HasAccessToComputer {
        const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Computer);
        if (answer) {
            switch (answer.answer) {
                case 'Yes':
                    return HasAccessToComputer.Yes;
                case 'No':
                    return HasAccessToComputer.No;
                case 'Not sure':
                    return HasAccessToComputer.NotSure;
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
