import { SelfTestAnswers } from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { ParticipantModelMapper } from './participant-model-mapper';
import { SelfTestQuestionKeys } from '../../base-journey/services/participant-model-mapper';
import { ParticipantSuitabilityModel } from '../../base-journey/participant-suitability.model';

describe('IndividualModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: ParticipantSuitabilityModel;

    let requestAnswersList: HearingSuitabilityAnswer[];
    let answerModel: ParticipantSuitabilityModel;

    beforeEach(() => {
        serviceResponse = new HearingSuitabilityResponse({
            hearing_id: '',
            participant_id: '',
            hearing_scheduled_at: new Date(),
            questionnaire_not_required: true,
            answers: [
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.CheckYourComputer,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.SeeYourself,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.Microphone,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.SeeHearClearly,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.TestResultScore,
                    answer: 'Okay',
                    extended_answer: ''
                })
            ]
        });

        answerModel = new ParticipantSuitabilityModel();
        answerModel.selfTest = new SelfTestAnswers();
    });

    const whenMappingModel = () => {
        model = new ParticipantModelMapper().map(serviceResponse);
    };

    const givenAnswerIs = (answerKey: string, answer: string) => {
        serviceResponse.answers.find(a => a.question_key === answerKey).answer = answer;
    };

    const givenExtendedAnswerIs = (answerKey: string, extendedAnswer: string) => {
        serviceResponse.answers.find(a => a.question_key === answerKey).extended_answer = extendedAnswer;
    };

    it('should map boolean values', () => {
        givenAnswerIs(SelfTestQuestionKeys.CheckYourComputer, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'false');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'false');
        givenAnswerIs(SelfTestQuestionKeys.TestResultScore, 'Okay');

        whenMappingModel();
        expect(model.selfTest.checkYourComputer).toBeFalsy();
        expect(model.selfTest.cameraWorking).toBeFalsy();
        expect(model.selfTest.microphoneWorking).toBeFalsy();
        expect(model.selfTest.seeAndHearClearly).toBeFalsy();
        expect(model.selfTest.selfTestResultScore).toEqual('Okay');
    });

    it('should map all answers', () => {
        givenAnswerIs(SelfTestQuestionKeys.CheckYourComputer, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'true');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'true');
        givenAnswerIs(SelfTestQuestionKeys.TestResultScore, 'Okay');

        whenMappingModel();

        expect(model.selfTest.checkYourComputer).toBeTruthy();
        expect(model.selfTest.cameraWorking).toBeTruthy();
        expect(model.selfTest.microphoneWorking).toBeTruthy();
        expect(model.selfTest.seeAndHearClearly).toBeTruthy();
        expect(model.selfTest.selfTestResultScore).toEqual('Okay');
    });

    it('should map hearing', () => {
        serviceResponse.hearing_id = '123';
        serviceResponse.participant_id = '456';
        serviceResponse.hearing_scheduled_at = new Date();
        serviceResponse.questionnaire_not_required = true;
        whenMappingModel();
        expect(model.hearing.id).toBe('123');
        expect(model.participantId).toBe('456');
        expect(model.hearing.scheduleDateTime).toEqual(serviceResponse.hearing_scheduled_at);
        expect(model.hearing.questionnaireNotRequired).toEqual(serviceResponse.questionnaire_not_required);
    });

    it('should map all the answers to request object', () => {
        requestAnswersList = new ParticipantModelMapper().mapToRequest(answerModel);
        expect(requestAnswersList.length).toBe(0);

        const listOfKeys = [
            SelfTestQuestionKeys.CheckYourComputer,
            SelfTestQuestionKeys.SeeYourself,
            SelfTestQuestionKeys.Microphone,
            SelfTestQuestionKeys.SeeHearClearly,
            SelfTestQuestionKeys.TestResultScore
        ];

        for (let i = 0; i < listOfKeys.length; ++i) {
            const answer = requestAnswersList.find(a => a.question_key === listOfKeys[i]);
            expect(answer).not.toBeNull();
        }
    });

    it('should map all undefined answers to request object', () => {
        answerModel = new ParticipantSuitabilityModel();
        answerModel.selfTest = new SelfTestAnswers();
        requestAnswersList = new ParticipantModelMapper().mapToRequest(answerModel);
        expect(requestAnswersList.length).toBe(0);
    });
});
