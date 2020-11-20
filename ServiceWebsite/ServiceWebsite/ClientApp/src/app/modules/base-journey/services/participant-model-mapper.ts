import { HearingSuitabilityAnswer, HearingSuitabilityResponse } from './../../../services/clients/api-client';
import { SuitabilityAnswer, SelfTestAnswers, ParticipantSuitabilityModel, Hearing } from '../participant-suitability.model';

export const SelfTestQuestionKeys = {
    CheckYourComputer: 'KIT_CHECK_YOUR_COMPUTER',
    SeeYourself: 'KIT_SEE_YOURSELF',
    Microphone: 'KIT_MICROPHONE',
    SeeHearClearly: 'KIT_SEE_HEAR_CLEARLY',
    TestResultScore: 'KIT_SELFTEST_SCORE'
};

export class ParticipantModelMapper {
    protected mapSelfTestAnswers(answers: HearingSuitabilityAnswer[]): SelfTestAnswers {
        const selfTestAnswers = new SelfTestAnswers();
        selfTestAnswers.checkYourComputer = this.mapBooleanValue(answers, SelfTestQuestionKeys.CheckYourComputer);
        selfTestAnswers.cameraWorking = this.mapBooleanValue(answers, SelfTestQuestionKeys.SeeYourself);
        selfTestAnswers.microphoneWorking = this.mapBooleanValue(answers, SelfTestQuestionKeys.Microphone);
        selfTestAnswers.seeAndHearClearly = this.mapBooleanValue(answers, SelfTestQuestionKeys.SeeHearClearly);
        selfTestAnswers.selfTestResultScore = this.mapTextValue(answers, SelfTestQuestionKeys.TestResultScore);

        return selfTestAnswers;
    }

    protected addSelfTestAnswers(selfTestAnswers: SelfTestAnswers, answers: HearingSuitabilityAnswer[]) {
        this.addBooleanAnswer(selfTestAnswers.checkYourComputer, SelfTestQuestionKeys.CheckYourComputer, answers);
        this.addBooleanAnswer(selfTestAnswers.cameraWorking, SelfTestQuestionKeys.SeeYourself, answers);
        this.addBooleanAnswer(selfTestAnswers.microphoneWorking, SelfTestQuestionKeys.Microphone, answers);
        this.addBooleanAnswer(selfTestAnswers.seeAndHearClearly, SelfTestQuestionKeys.SeeHearClearly, answers);
        this.addTextAnswer(selfTestAnswers.selfTestResultScore, SelfTestQuestionKeys.TestResultScore, answers);
    }

    public mapBooleanValue(answers: HearingSuitabilityAnswer[], key: string) {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return answer.answer === 'true';
        }
        return undefined;
    }

    public mapTextValue(answers: HearingSuitabilityAnswer[], key: string) {
        const answer = answers.find(a => a.question_key === key);
        if (answer) {
            return answer.answer;
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
        if (modelAnswer.answer !== undefined) {
            answers.push(this.createHearingSuitabilityAnswer(key, modelAnswer.answer, modelAnswer.notes));
        }
    }

    public addBooleanAnswer(modelAnswer: boolean, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            answers.push(this.createHearingSuitabilityAnswer(key, modelAnswer, null));
        }
    }

    public addTextAnswer(modelAnswer: string, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            answers.push(this.createTextSelfTestAnswer(key, modelAnswer));
        }
    }

    private createHearingSuitabilityAnswer(key: string, answer: boolean, extendedAnswer: string): HearingSuitabilityAnswer {
        const hearingSuitabilityAnswer = new HearingSuitabilityAnswer();
        hearingSuitabilityAnswer.question_key = key;
        hearingSuitabilityAnswer.answer = answer.toString();
        if (extendedAnswer !== null) {
            hearingSuitabilityAnswer.extended_answer = extendedAnswer;
        }
        return hearingSuitabilityAnswer;
    }

    public createTextSelfTestAnswer(key: string, answer: string): HearingSuitabilityAnswer {
        const hearingSuitabilityAnswer = new HearingSuitabilityAnswer();
        hearingSuitabilityAnswer.question_key = key;
        hearingSuitabilityAnswer.answer = answer;

        return hearingSuitabilityAnswer;
    }

    map(response: HearingSuitabilityResponse): ParticipantSuitabilityModel {
        const model = new ParticipantSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
        model.selfTest = this.mapSelfTestAnswers(response.answers);
        model.participantId = response.participant_id;

        return model;
    }

    mapToRequest(model: ParticipantSuitabilityModel): HearingSuitabilityAnswer[] {
        const answers: HearingSuitabilityAnswer[] = [];
        this.addSelfTestAnswers(model.selfTest, answers);

        return answers;
    }
}
