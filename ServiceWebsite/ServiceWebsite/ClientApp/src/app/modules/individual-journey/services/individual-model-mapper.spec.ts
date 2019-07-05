import {SuitabilityAnswer, HasAccessToCamera, SelfTestAnswers} from '../../base-journey/participant-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { IndividualModelMapper, IndividualQuestionKeys, SelfTestQuestionKeys } from './individual-model-mapper';
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
                    question_key: IndividualQuestionKeys.AboutYou,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Consent,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Computer,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Internet,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Interpreter,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Room,
                    answer: 'true',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                    question_key: IndividualQuestionKeys.Camera,
                    answer: 'Yes',
                    extended_answer: ''
                }),
                new HearingSuitabilityAnswer({
                  question_key: SelfTestQuestionKeys.SameComputer,
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
      answerModel.selfTest = new SelfTestAnswers();

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
            givenAnswerIs(IndividualQuestionKeys.Camera, values[i]);
            whenMappingModel();
            expect(model.camera).toBe(expected[i]);
        }
    });

    it('should map boolean values', () => {
        givenAnswerIs(IndividualQuestionKeys.Interpreter, 'false');
        givenAnswerIs(IndividualQuestionKeys.Computer, 'false');
        givenAnswerIs(IndividualQuestionKeys.Internet, 'false');
        givenAnswerIs(IndividualQuestionKeys.Room, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SameComputer, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'false');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'false');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'false');

        whenMappingModel();
        expect(model.interpreter).toBeFalsy();
        expect(model.computer).toBeFalsy();
        expect(model.internet).toBeFalsy();
        expect(model.room).toBeFalsy();
        expect(model.selfTest.sameComputer).toBeFalsy();
        expect(model.selfTest.cameraWorking).toBeFalsy();
        expect(model.selfTest.microphoneWorking).toBeFalsy();
        expect(model.selfTest.seeAndHearClearly).toBeFalsy();
    });

    it('should map false answers', () => {
        givenAnswerIs(IndividualQuestionKeys.AboutYou, 'false');
        givenAnswerIs(IndividualQuestionKeys.Consent, 'false');
        whenMappingModel();
        expect(model.aboutYou.answer).toBeFalsy();
        expect(model.consent.answer).toBeFalsy();
    });

    it('should map all answers', () => {
        givenAnswerIs(IndividualQuestionKeys.AboutYou, 'true');
        givenAnswerIs(IndividualQuestionKeys.Consent, 'true');
        givenAnswerIs(IndividualQuestionKeys.Internet, 'true');
        givenAnswerIs(IndividualQuestionKeys.Room, 'true');
        givenAnswerIs(IndividualQuestionKeys.Computer, 'true');
        givenAnswerIs(IndividualQuestionKeys.Interpreter, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SameComputer, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'true');
        givenAnswerIs(SelfTestQuestionKeys.Microphone, 'true');
        givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'true');

        whenMappingModel();

        expect(model.aboutYou.answer).toBeTruthy();
        expect(model.consent.answer).toBeTruthy();
        expect(model.internet).toBeTruthy();
        expect(model.room).toBeTruthy();
        expect(model.computer).toBeTruthy();
        expect(model.interpreter).toBeTruthy();
        expect(model.selfTest.sameComputer).toBeTruthy();
        expect(model.selfTest.cameraWorking).toBeTruthy();
        expect(model.selfTest.microphoneWorking).toBeTruthy();
        expect(model.selfTest.seeAndHearClearly).toBeTruthy();
    });

    it('should map extended answer', () => {
        givenExtendedAnswerIs(IndividualQuestionKeys.AboutYou, 'more information');
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

    const listOfKeys = [
      IndividualQuestionKeys.AboutYou,
      IndividualQuestionKeys.Consent,
      IndividualQuestionKeys.Internet,
      IndividualQuestionKeys.Room,
      IndividualQuestionKeys.Interpreter,
      IndividualQuestionKeys.Computer,
      IndividualQuestionKeys.Camera,
      SelfTestQuestionKeys.SameComputer,
      SelfTestQuestionKeys.SeeYourself,
      SelfTestQuestionKeys.Microphone,
      SelfTestQuestionKeys.SeeHearClearly
    ];

    for (let i = 0; i < listOfKeys.length; ++i) {
      const answer = requestAnswersList.find(a => a.question_key === listOfKeys[i]);
      expect(answer).not.toBeNull();
    }
  });

  it('should map all undefined answers to request object', () => {
    answerModel = new MutableIndividualSuitabilityModel();
    answerModel.selfTest = new SelfTestAnswers();
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    expect(requestAnswersList.length).toBe(0);
  });

  it('should map one of the undefined answer to request object', () => {
    const suitability: SuitabilityAnswer = {
      answer: undefined,
      notes: undefined
    };
    // Set any of the suitability answer type (aboutYou or consent) to undefined
    answerModel.aboutYou = suitability;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    let requestAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.AboutYou);
    expect(requestAnswersList.length).toBe(6);
    expect(requestAnswer).toBeUndefined();

    // Set boolean value to undefined
    answerModel.computer = undefined;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    requestAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.Computer);
    expect(requestAnswer).toBeUndefined();

    // Set camera answer to undefined
    answerModel.camera = undefined;
    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    requestAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.Computer);
    expect(requestAnswer).toBeUndefined();

  });

  it('should map about you answer with notes to request object', () => {

    const suitability: SuitabilityAnswer = {
      answer: true,
      notes: 'About you Notes'
    };
    answerModel.aboutYou = suitability;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    const aboutYouAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.AboutYou);
    expect(aboutYouAnswer.question_key).toBe(IndividualQuestionKeys.AboutYou);
    expect(aboutYouAnswer.answer).toBe('true');
    expect(aboutYouAnswer.extended_answer).toBe('About you Notes');
  });

  it('should map about you answer of No to request object', () => {

    const suitability: SuitabilityAnswer = {
      answer: false,
      notes: undefined
    };
    answerModel.aboutYou = suitability;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);

    const aboutYouAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.AboutYou);
    expect(aboutYouAnswer.question_key).toBe(IndividualQuestionKeys.AboutYou);
    expect(aboutYouAnswer.answer).toBe('false');
    expect(aboutYouAnswer.extended_answer).toBe(undefined);
  });

  it('should map computer camera and microphone answer to request object', () => {
    const values = ['Yes', 'No', 'Not sure'];
    const expected = [HasAccessToCamera.Yes, HasAccessToCamera.No, HasAccessToCamera.NotSure];

    for (let i = 0; i < expected.length; ++i) {
      answerModel.camera = expected[i];
      requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
      const cameraAnswer = requestAnswersList.find(a => a.question_key === IndividualQuestionKeys.Camera);
      expect(cameraAnswer.question_key).toBe(IndividualQuestionKeys.Camera);
      expect(cameraAnswer.answer).toBe(values[i]);
      expect(cameraAnswer.extended_answer).toBe(undefined);
    }
  });

  it('should map boolean No value to request object', () => {
    answerModel.internet = false;
    answerModel.room = false;
    answerModel.interpreter = false;
    answerModel.computer = false;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    validateBooleanExpectation(requestAnswersList, 'false');
  });

  it('should map boolean value to request object', () => {
    answerModel.internet = true;
    answerModel.room = true;
    answerModel.interpreter = true;
    answerModel.computer = true;

    requestAnswersList = new IndividualModelMapper().mapToRequest(answerModel);
    validateBooleanExpectation(requestAnswersList, 'true');
  });

  const validateBooleanExpectation = (requestAnswers: HearingSuitabilityAnswer[], toBe: string) => {
    const internetAnswer = requestAnswers.find(a => a.question_key === IndividualQuestionKeys.Internet);
    expect(internetAnswer.question_key).toBe(IndividualQuestionKeys.Internet);
    expect(internetAnswer.answer).toBe(toBe);
    expect(internetAnswer.extended_answer).toBe(undefined);

    const roomAnswer = requestAnswers.find(a => a.question_key === IndividualQuestionKeys.Room);
    expect(roomAnswer.question_key).toBe(IndividualQuestionKeys.Room);
    expect(roomAnswer.answer).toBe(toBe);
    expect(roomAnswer.extended_answer).toBe(undefined);

    const interpreterAnswer = requestAnswers.find(a => a.question_key === IndividualQuestionKeys.Interpreter);
    expect(interpreterAnswer.question_key).toBe(IndividualQuestionKeys.Interpreter);
    expect(interpreterAnswer.answer).toBe(toBe);
    expect(interpreterAnswer.extended_answer).toBe(undefined);

    const computerAnswer = requestAnswers.find(a => a.question_key === IndividualQuestionKeys.Computer);
    expect(computerAnswer.question_key).toBe(IndividualQuestionKeys.Computer);
    expect(computerAnswer.answer).toBe(toBe);
    expect(computerAnswer.extended_answer).toBe(undefined);
  };

});

