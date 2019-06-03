import { HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { RepresentativeModelMapper, RepresentativeQuestionKeys as Keys } from './representative-model-mapper';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';

describe('RepresentativeModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: RepresentativeSuitabilityModel;

    beforeEach(() => {
        serviceResponse = new HearingSuitabilityResponse({
            hearing_id: '',
            hearing_scheduled_at: new Date(),
            answers: [
                new HearingSuitabilityAnswer({
                    question_key: Keys.AboutYou,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.AboutYourClient,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.ClientAttendance,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.HearingSuitability,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Room,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Camera,
                    answer: 'Yes',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Computer,
                    answer: 'true',
                    extended_answer: ''
                }),
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
            givenAnswerIs(Keys.Camera, values[i]);
            whenMappingModel();
            expect(model.camera).toBe(expected[i]);
        }
    });

    it('should map boolean values', () => {
        givenAnswerIs(Keys.ClientAttendance, 'false');
        givenAnswerIs(Keys.Computer, 'false');
        givenAnswerIs(Keys.Room, 'false');

        whenMappingModel();
        expect(model.clientAttenance).toBeFalsy();
        expect(model.computer).toBeFalsy();
        expect(model.room).toBeFalsy();
    });

    it('should map false answers', () => {
        givenAnswerIs(Keys.AboutYou, 'false');
        givenAnswerIs(Keys.AboutYourClient, 'false');
        whenMappingModel();
        expect(model.aboutYou.answer).toBeFalsy();
        expect(model.aboutClient.answer).toBeFalsy();
    });

    it('should map all yes/no answers', () => {
        givenAnswerIs(Keys.AboutYou, 'true');
        givenAnswerIs(Keys.AboutYourClient, 'true');
        givenAnswerIs(Keys.HearingSuitability, 'true');
        givenAnswerIs(Keys.Room, 'true');
        givenAnswerIs(Keys.Computer, 'true');
        givenAnswerIs(Keys.ClientAttendance, 'true');

        whenMappingModel();

        expect(model.aboutYou.answer).toBeTruthy();
        expect(model.aboutClient.answer).toBeTruthy();
        expect(model.hearingSuitability).toBeTruthy();
        expect(model.room).toBeTruthy();
        expect(model.computer).toBeTruthy();
        expect(model.clientAttenance).toBeTruthy();
    });

    it('should map extended answer', () => {
        givenExtendedAnswerIs(Keys.AboutYou, 'more information');
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
