import { HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { IndividualModelMapper, IndividualQuestionKeys as Keys } from './individual-model-mapper';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

describe('IndividualModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: IndividualSuitabilityModel;

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
                    question_key: Keys.Consent,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Computer,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Internet,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: Keys.Interpreter,
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
            ]
        });
    });

    const whenMappingModel = () => {
        model = new IndividualModelMapper().map(serviceResponse);
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
        givenAnswerIs(Keys.Interpreter, 'false');
        givenAnswerIs(Keys.Computer, 'false');
        givenAnswerIs(Keys.Internet, 'false');
        givenAnswerIs(Keys.Room, 'false');

        whenMappingModel();
        expect(model.interpreter).toBeFalsy();
        expect(model.computer).toBeFalsy();
        expect(model.internet).toBeFalsy();
        expect(model.room).toBeFalsy();
    });

    it('should map false answers', () => {
        givenAnswerIs(Keys.AboutYou, 'false');
        givenAnswerIs(Keys.Consent, 'false');
        whenMappingModel();
        expect(model.aboutYou.answer).toBeFalsy();
        expect(model.consent.answer).toBeFalsy();
    });

    it('should map all yes/no answers', () => {
        givenAnswerIs(Keys.AboutYou, 'true');
        givenAnswerIs(Keys.Consent, 'true');
        givenAnswerIs(Keys.Internet, 'true');
        givenAnswerIs(Keys.Room, 'true');
        givenAnswerIs(Keys.Computer, 'true');
        givenAnswerIs(Keys.Interpreter, 'true');

        whenMappingModel();

        expect(model.aboutYou.answer).toBeTruthy();
        expect(model.consent.answer).toBeTruthy();
        expect(model.internet).toBeTruthy();
        expect(model.room).toBeTruthy();
        expect(model.computer).toBeTruthy();
        expect(model.interpreter).toBeTruthy();
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
