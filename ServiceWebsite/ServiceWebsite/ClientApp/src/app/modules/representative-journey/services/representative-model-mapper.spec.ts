import { HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { RepresentativeModelMapper, RepresentativeQuestionKeys } from './representative-model-mapper';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { SelfTestQuestionKeys } from '../../base-journey/services/participant-model-mapper';

describe('RepresentativeModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: RepresentativeSuitabilityModel;

    beforeEach(() => {
        serviceResponse = new HearingSuitabilityResponse({
            hearing_id: '',
            hearing_scheduled_at: new Date(),
            answers: [
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.AboutYou,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.AboutYourClient,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.ClientAttendance,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.HearingSuitability,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.Room,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.Camera,
                    answer: 'Yes',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: RepresentativeQuestionKeys.Computer,
                    answer: 'true',
                    extended_answer: ''
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

    const givenExtendedAnswerIs = (answerKey: string, extendedAnswer: string) => {
        serviceResponse.answers.find(a => a.question_key === answerKey).extended_answer = extendedAnswer;
    };

    it('should map computer camera and microphone answers', () => {
        const values = ['Yes', 'No', 'Not sure'];
        const expected = [HasAccessToCamera.Yes, HasAccessToCamera.No, HasAccessToCamera.NotSure];

        for (let i = 0; i < expected.length; ++i) {
            givenAnswerIs(RepresentativeQuestionKeys.Camera, values[i]);
            whenMappingModel();
            expect(model.camera).toBe(expected[i]);
        }
    });

    it('should map boolean values', () => {
        givenAnswerIs(RepresentativeQuestionKeys.ClientAttendance, 'false');
        givenAnswerIs(RepresentativeQuestionKeys.Computer, 'false');
        givenAnswerIs(RepresentativeQuestionKeys.Room, 'false');
        givenAnswerIs(SelfTestQuestionKeys.CheckYourComputer, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'false');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'false');

        whenMappingModel();
        expect(model.clientAttendance).toBeFalsy();
        expect(model.computer).toBeFalsy();
        expect(model.room).toBeFalsy();
        expect(model.selfTest.checkYourComputer).toBeFalsy();
        expect(model.selfTest.cameraWorking).toBeFalsy();
        expect(model.selfTest.microphoneWorking).toBeFalsy();
        expect(model.selfTest.seeAndHearClearly).toBeFalsy();
    });

    it('should map false answers', () => {
        givenAnswerIs(RepresentativeQuestionKeys.AboutYou, 'false');
        givenAnswerIs(RepresentativeQuestionKeys.AboutYourClient, 'false');
        whenMappingModel();
        expect(model.aboutYou.answer).toBeFalsy();
        expect(model.aboutYourClient.answer).toBeFalsy();
    });

    it('should map all answers', () => {
        givenAnswerIs(RepresentativeQuestionKeys.AboutYou, 'true');
        givenAnswerIs(RepresentativeQuestionKeys.AboutYourClient, 'true');
        givenAnswerIs(RepresentativeQuestionKeys.HearingSuitability, 'true');
        givenAnswerIs(RepresentativeQuestionKeys.Room, 'true');
        givenAnswerIs(RepresentativeQuestionKeys.Computer, 'true');
        givenAnswerIs(RepresentativeQuestionKeys.ClientAttendance, 'true');
        givenAnswerIs(SelfTestQuestionKeys.CheckYourComputer, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'true');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'true');

        whenMappingModel();

        expect(model.aboutYou.answer).toBeTruthy();
        expect(model.aboutYourClient.answer).toBeTruthy();
        expect(model.hearingSuitability).toBeTruthy();
        expect(model.room).toBeTruthy();
        expect(model.computer).toBeTruthy();
        expect(model.clientAttendance).toBeTruthy();
        expect(model.selfTest.checkYourComputer).toBeTruthy();
        expect(model.selfTest.cameraWorking).toBeTruthy();
        expect(model.selfTest.microphoneWorking).toBeTruthy();
        expect(model.selfTest.seeAndHearClearly).toBeTruthy();
    });

    it('should map extended answer', () => {
        givenExtendedAnswerIs(RepresentativeQuestionKeys.AboutYou, 'more information');
        whenMappingModel();
        expect(model.aboutYou.notes).toBe('more information');
    });

    it('should map hearing', () => {
        serviceResponse.hearing_id = '123';
        serviceResponse.hearing_scheduled_at = new Date();
        whenMappingModel();
        expect(model.hearing.id).toBe('123');
        expect(model.hearing.scheduleDateTime).toEqual(serviceResponse.hearing_scheduled_at);
    });
});
