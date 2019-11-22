import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { RepresentativeModelMapper, RepresentativeQuestionKeys, PresentingCaseConstants } from './representative-model-mapper';
import { RepresentativeSuitabilityModel, PresentingTheCase, PresentingCaseDetails } from '../representative-suitability.model';
import { SelfTestQuestionKeys } from '../../base-journey/services/participant-model-mapper';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { SelfTestAnswers, SuitabilityAnswer } from '../../base-journey/participant-suitability.model';

describe('RepresentativeModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: RepresentativeSuitabilityModel;

    beforeEach(() => {
        serviceResponse = new HearingSuitabilityResponse({
            hearing_id: '',
            participant_id: '',
            hearing_scheduled_at: new Date(),
            questionnaire_not_required: true,
            answers: [
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.PresentingTheCase,
                    answer: PresentingCaseConstants.AnswerIAmPresenting,
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.PresentingTheCaseName,
                    answer: 'David',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.PresentingTheCaseEmail,
                    answer: 'email@barrister.com',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.OtherInformation,
                    answer: 'false',
                    extended_answer: 'other information'
                }),
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.CheckYourComputer,
                    answer: 'true',
                    extended_answer: ''
                })
                ,
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.SeeYourself,
                    answer: 'true',
                    extended_answer: ''
                })
                ,
                new HearingSuitabilityAnswer({
                    question_key: SelfTestQuestionKeys.Microphone,
                    answer: 'true',
                    extended_answer: ''
                })
                ,
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
    });

    const whenMappingModel = () => {
        model = new RepresentativeModelMapper().map(serviceResponse);
    };

    const givenAnswerIs = (answerKey: string, answer: string) => {
        serviceResponse.answers.find(a => a.question_key === answerKey).answer = answer;
    };

    it('should map appointed barrister answers', () => {
        const values = [PresentingCaseConstants.AnswerIAmPresenting,
            PresentingCaseConstants.AnswerSomeonePresenting,
            ];
        const expected = [PresentingTheCase.IWillBePresentingTheCase,
            PresentingTheCase.SomeoneWillBePresenting,
            ];

        for (let i = 0; i < expected.length; ++i) {
            givenAnswerIs(RepresentativeQuestionKeys.PresentingTheCase, values[i]);
            whenMappingModel();
            expect(model.presentingTheCase).toBe(expected[i]);
        }
    });

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

    it('should map false answers', () => {
        givenAnswerIs(RepresentativeQuestionKeys.OtherInformation, 'false');
        whenMappingModel();
        expect(model.otherInformation.answer).toBeFalsy();
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
        serviceResponse.hearing_scheduled_at = new Date();
        serviceResponse.questionnaire_not_required = true;
        whenMappingModel();
        expect(model.hearing.id).toBe('123');
        expect(model.hearing.scheduleDateTime).toEqual(serviceResponse.hearing_scheduled_at);
        expect(model.hearing.questionnaireNotRequired).toEqual(serviceResponse.questionnaire_not_required);
    });
    it('should map to request all presenting the case and self test answers', () => {
        const modelMutable = new MutableRepresentativeSuitabilityModel();
        modelMutable.presentingTheCase = PresentingTheCase.SomeoneWillBePresenting;
        modelMutable.presentingCaseDetails = new PresentingCaseDetails(
            { fullName: 'John', email: 'email@email.com' });
        modelMutable.otherInformation = new SuitabilityAnswer();
        modelMutable.selfTest = new SelfTestAnswers({
            seeAndHearClearly: true, checkYourComputer: true, cameraWorking: true, microphoneWorking: true, selfTestResultScore: 'Good'
        });
        const request = new RepresentativeModelMapper().mapToRequest(modelMutable);

        expect(request.length).toBe(8);

    });
});
