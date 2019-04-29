import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { IndividualModelMapper, IndividualQuestionKeys as Keys } from './individual-model-mapper';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

describe('IndividualModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: IndividualSuitabilityModel;

    beforeEach(() => {
        serviceResponse = new HearingSuitabilityResponse({
            hearing_id: '123',
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
                    answer: 'Yes',
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
            ]
        });
    });

    const whenMappingModel = () => {
        model = new IndividualModelMapper().map(serviceResponse);
    };

    const givenAnswerIs = (answerKey: string, answer: string) => {
        serviceResponse.answers.find(a => a.question_key === answerKey).answer = answer;
    };

    it('should map false answers', () => {
        givenAnswerIs(Keys.AboutYou, 'false');

        whenMappingModel();

        expect(model.aboutYou.answer).toBeFalsy();
    });

    it('should map all yes/no answers', () => {
        givenAnswerIs(Keys.AboutYou, 'true');
        givenAnswerIs(Keys.Consent, 'true');
        givenAnswerIs(Keys.Internet, 'true');
        givenAnswerIs(Keys.Room, 'true');
        givenAnswerIs(Keys.Interpreter, 'true');

        whenMappingModel();

        // then
        expect(model.aboutYou.answer).toBe(true);
        expect(model.consent.answer).toBe(true);
        expect(model.internet.answer).toBe(true);
        expect(model.room.answer).toBe(true);
        expect(model.interpreter).toBe(true);
    });
});
