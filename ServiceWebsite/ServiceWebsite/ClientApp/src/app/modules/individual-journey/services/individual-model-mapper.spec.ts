import { SuitabilityAnswer, HasAccessToCamera } from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from './../../../services/clients/api-client';
import { IndividualModelMapper, IndividualQuestionKeys as Keys } from './individual-model-mapper';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';

describe('IndividualModelMapper', () => {
    let serviceResponse: HearingSuitabilityResponse;
    let model: IndividualSuitabilityModel;

    let requestAnswersList: HearingSuitabilityAnswer[];
    let answerModel: MutableIndividualSuitabilityModel;

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

      const suitability: SuitabilityAnswer = {
        answer: true,
        notes: 'Test Notes'
      };
      answerModel = new MutableIndividualSuitabilityModel();
      answerModel.aboutYou = suitability;
      answerModel.computer = true;
      answerModel.internet = true;
      answerModel.interpreter = true;
      answerModel.room = true;
      answerModel.camera = HasAccessToCamera.Yes;
      answerModel.consent = suitability;

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

  it('should map all the answers to request object', () => {
      requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
      expect(requestAnswersList.length).toBeGreaterThan(0);
      expect(requestAnswersList.length).toBe(7);
      expect(requestAnswersList[0].question_key).toBe(Keys.AboutYou);
      expect(requestAnswersList[1].question_key).toBe(Keys.Consent);
      expect(requestAnswersList[2].question_key).toBe(Keys.Internet);
      expect(requestAnswersList[3].question_key).toBe(Keys.Room);
      expect(requestAnswersList[4].question_key).toBe(Keys.Interpreter);
      expect(requestAnswersList[5].question_key).toBe(Keys.Computer);
      expect(requestAnswersList[6].question_key).toBe(Keys.Camera);
  });

  it('should map all undefined answers to request object', () => {
    answerModel = new MutableIndividualSuitabilityModel();
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    expect(requestAnswersList.length).toBe(0);
  });

  it('should map one of the undefined answer to request object', () => {
    const suitability: SuitabilityAnswer = {
      answer: undefined,
      notes: undefined
    };
    //Set any of the suitability answer type (aboutYou or consent) to undefined
    answerModel.aboutYou = suitability;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    let requestAnswer = requestAnswersList.find(a => a.question_key === Keys.AboutYou);
    expect(requestAnswersList.length).toBe(6);
    expect(requestAnswer).toBeUndefined();

    //Set boolean value to undefined
    answerModel.computer = undefined;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    requestAnswer = requestAnswersList.find(a => a.question_key === Keys.Computer);
    expect(requestAnswer).toBeUndefined();

    //Set camera answer to undefined
    answerModel.camera = undefined;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    requestAnswer = requestAnswersList.find(a => a.question_key === Keys.Computer);
    expect(requestAnswer).toBeUndefined;

  });

  it('should map about you answer of Yes with notes to request object', () => {

    const suitability: SuitabilityAnswer = {
      answer: true,
      notes: 'About you Notes'
    };
    answerModel.aboutYou = suitability;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    
    expect(requestAnswersList[0].question_key).toBe(Keys.AboutYou);
    expect(requestAnswersList[0].answer).toBe('Yes');
    expect(requestAnswersList[0].extended_answer).toBe('About you Notes');
  });

  it('should map about you answer of No to request object', () => {

    const suitability: SuitabilityAnswer = {
      answer: false,
      notes: undefined
    };
    answerModel.aboutYou = suitability;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);

    expect(requestAnswersList[0].question_key).toBe(Keys.AboutYou);
    expect(requestAnswersList[0].answer).toBe('No');
    expect(requestAnswersList[0].extended_answer).toBe(undefined);
  });

  it('should map computer camera and microphone answer to request object', () => {
    const values = ['Yes', 'No', 'Not sure'];
    const expected = [HasAccessToCamera.Yes, HasAccessToCamera.No, HasAccessToCamera.NotSure];

    for (let i = 0; i < expected.length; ++i) {
      answerModel.camera = expected[i];
      requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
      expect(requestAnswersList[6].question_key).toBe(Keys.Camera);
      expect(requestAnswersList[6].answer).toBe(values[i]);
      expect(requestAnswersList[6].extended_answer).toBe(undefined);
    }
  });

  it('should map boolean No value to request object', () => {
    answerModel.internet = false;
    answerModel.room = false;
    answerModel.interpreter = false;
    answerModel.computer = false;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);

    expect(requestAnswersList[2].question_key).toBe(Keys.Internet);
    expect(requestAnswersList[2].answer).toBe('No');
    expect(requestAnswersList[2].extended_answer).toBe(undefined);
    expect(requestAnswersList[3].question_key).toBe(Keys.Room);
    expect(requestAnswersList[3].answer).toBe('No');
    expect(requestAnswersList[3].extended_answer).toBe(undefined);
    expect(requestAnswersList[4].question_key).toBe(Keys.Interpreter);
    expect(requestAnswersList[4].answer).toBe('No');
    expect(requestAnswersList[4].extended_answer).toBe(undefined);
    expect(requestAnswersList[5].question_key).toBe(Keys.Computer);
    expect(requestAnswersList[5].answer).toBe('No');
    expect(requestAnswersList[5].extended_answer).toBe(undefined);
  });

  it('should map boolean Yes value to request object', () => {
    answerModel.internet = true;
    answerModel.room = true;
    answerModel.interpreter = true;
    answerModel.computer = true;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);

    expect(requestAnswersList[2].question_key).toBe(Keys.Internet);
    expect(requestAnswersList[2].answer).toBe('Yes');
    expect(requestAnswersList[2].extended_answer).toBe(undefined);
    expect(requestAnswersList[3].question_key).toBe(Keys.Room);
    expect(requestAnswersList[3].answer).toBe('Yes');
    expect(requestAnswersList[3].extended_answer).toBe(undefined);
    expect(requestAnswersList[4].question_key).toBe(Keys.Interpreter);
    expect(requestAnswersList[4].answer).toBe('Yes');
    expect(requestAnswersList[4].extended_answer).toBe(undefined);
    expect(requestAnswersList[5].question_key).toBe(Keys.Computer);
    expect(requestAnswersList[5].answer).toBe('Yes');
    expect(requestAnswersList[5].extended_answer).toBe(undefined);
  });

});
