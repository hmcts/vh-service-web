import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from '../../../services/clients/api-client';
import { RepresentativeModelMapper, RepresentativeQuestionKeys } from './representative-model-mapper';
import { RepresentativeSuitabilityModel, AppointingBarrister } from '../representative-suitability.model';
import { SelfTestQuestionKeys } from '../../base-journey/services/participant-model-mapper';

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
          question_key: RepresentativeQuestionKeys.Barrister,
          answer: 'I am the appointed barrister',
          extended_answer: ''
        }),
        new HearingSuitabilityAnswer({
          question_key: RepresentativeQuestionKeys.BarristerName,
          answer: 'David',
          extended_answer: ''
        }),
        new HearingSuitabilityAnswer({
          question_key: RepresentativeQuestionKeys.BarristerChambers,
          answer: 'Chamber 1',
          extended_answer: ''
        }),
        new HearingSuitabilityAnswer({
          question_key: RepresentativeQuestionKeys.BarristerEmail,
          answer: 'email@barrister.com',
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
    const values = ['I am the appointed barrister',
      'A barrister has been/will be appointed',
      'A barrister will not be appointed'];
    const expected = [AppointingBarrister.IAmAppointedBarrister,
    AppointingBarrister.BarristerWillBeAppointed,
    AppointingBarrister.BarristerWillNotBeAppointed];

    for (let i = 0; i < expected.length; ++i) {
      givenAnswerIs(RepresentativeQuestionKeys.Barrister, values[i]);
      whenMappingModel();
      expect(model.appointingBarrister).toBe(expected[i]);
    }
  });

  it('should map boolean values', () => {
    givenAnswerIs(SelfTestQuestionKeys.CheckYourComputer, 'false');
    givenAnswerIs(SelfTestQuestionKeys.SeeYourself, 'false');
    givenAnswerIs(SelfTestQuestionKeys.Microphone, 'false');
    givenAnswerIs(SelfTestQuestionKeys.SeeHearClearly, 'false');
    givenAnswerIs(SelfTestQuestionKeys.TestResultScore, 'Okay');

    whenMappingModel();
    expect(model.computer).toBeFalsy();
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
    serviceResponse.hearing_scheduled_at = new Date();
    serviceResponse.questionnaire_not_required = true;
    whenMappingModel();
    expect(model.hearing.id).toBe('123');
    expect(model.hearing.scheduleDateTime).toEqual(serviceResponse.hearing_scheduled_at);
    expect(model.hearing.questionnaireNotRequired).toEqual(serviceResponse.questionnaire_not_required);
  });
});
