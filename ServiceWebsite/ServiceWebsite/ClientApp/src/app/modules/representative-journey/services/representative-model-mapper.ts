import { Hearing } from '../../base-journey/participant-suitability.model';
import {
    RepresentativeSuitabilityModel,
    PresentingTheCase,
    PresentingCaseDetails
} from '../representative-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const RepresentativeQuestionKeys = {
    PresentingTheCase: 'PRESENTING_THE_CASE',
    PresentingTheCaseName: 'PRESENTING_NAME',
    PresentingTheCaseEmail: 'PRESENTING_EMAIL',
    OtherInformation: 'OTHER_INFORMATION'
};

export const PresentingCaseConstants = {
    AnswerIAmPresenting: 'I will be presenting the case',
    AnswerSomeonePresenting: 'Someone will be presenting the case',
    AnswerError: 'Unexpected answer to presenting the case question:'
};

export class RepresentativeModelMapper extends ParticipantModelMapper {

    map(response: HearingSuitabilityResponse): RepresentativeSuitabilityModel {
        const model = new MutableRepresentativeSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
        model.presentingTheCase = this.mapPresentingTheCaseAnswer(response.answers);
        model.presentingCaseDetails = this.mapPresentingTheCaseDetails(response.answers);

        model.otherInformation = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.OtherInformation, response.answers);
        model.selfTest = this.mapSelfTestAnswers(response.answers);
        model.participantId = response.participant_id;
        return model;
    }

    mapToRequest(model: MutableRepresentativeSuitabilityModel): HearingSuitabilityAnswer[] {
        const answers: HearingSuitabilityAnswer[] = [];
        this.addAnswerForPresentingTheCase(model.presentingTheCase, RepresentativeQuestionKeys.PresentingTheCase, answers);
        if (model.presentingTheCase === PresentingTheCase.SomeoneWillBePresenting) {
            this.addAnswerForPresentingTheCaseDetails(model.presentingCaseDetails.fullName,
                RepresentativeQuestionKeys.PresentingTheCaseName, answers);
            this.addAnswerForPresentingTheCaseDetails(model.presentingCaseDetails.email,
                RepresentativeQuestionKeys.PresentingTheCaseEmail, answers);
        }
        this.addSuitabilityAnswer(model.otherInformation, RepresentativeQuestionKeys.OtherInformation, answers);
        this.addSelfTestAnswers(model.selfTest, answers);

        return answers;
    }

    public addAnswerForPresentingTheCase(modelAnswer: PresentingTheCase, key: string, answers: HearingSuitabilityAnswer[]) {
        if (modelAnswer !== undefined) {
            const answer = new HearingSuitabilityAnswer();
            answer.question_key = key;
            answer.answer = this.getPresentingTheCaseAnswer(modelAnswer);
            answers.push(answer);
        }
    }

    public addAnswerForPresentingTheCaseDetails(modelAnswer: string, key: string, answers: HearingSuitabilityAnswer[]) {
        const answer = this.createTextSelfTestAnswer(key, modelAnswer);
        answers.push(answer);
    }

    mapPresentingTheCaseDetails(answers: HearingSuitabilityAnswer[]): PresentingCaseDetails {
        const presentingTheCaseDetails = new PresentingCaseDetails();
        answers.forEach(a => {
            switch (a.question_key) {
                case RepresentativeQuestionKeys.PresentingTheCaseName:
                    presentingTheCaseDetails.fullName = a.answer;
                    break;
                case RepresentativeQuestionKeys.PresentingTheCaseEmail:
                    presentingTheCaseDetails.email = a.answer;
                    break;
            }
        });

        return presentingTheCaseDetails;
    }

    private getPresentingTheCaseAnswer(presentingTheCase: PresentingTheCase) {
        switch (presentingTheCase) {
            case PresentingTheCase.IWillBePresentingTheCase:
                return PresentingCaseConstants.AnswerIAmPresenting;
            case PresentingTheCase.SomeoneWillBePresenting:
                return PresentingCaseConstants.AnswerSomeonePresenting;
            default:
                throw new Error(`${PresentingCaseConstants.AnswerError} ${presentingTheCase}`);
        }
    }

    public mapPresentingTheCaseAnswer(answers: HearingSuitabilityAnswer[]): PresentingTheCase {
        const answer = answers.find(a => a.question_key === RepresentativeQuestionKeys.PresentingTheCase);
        if (answer) {
            switch (answer.answer) {
                case PresentingCaseConstants.AnswerIAmPresenting:
                    return PresentingTheCase.IWillBePresentingTheCase;
                case PresentingCaseConstants.AnswerSomeonePresenting:
                    return PresentingTheCase.SomeoneWillBePresenting;
                default:
                    throw new Error(`${PresentingCaseConstants.AnswerError}${answer.answer}`);
            }
        }
        return undefined;
    }
}
