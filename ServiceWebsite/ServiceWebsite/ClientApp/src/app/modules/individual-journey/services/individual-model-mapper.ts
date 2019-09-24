import { Hearing } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel, HasAccessToCamera } from '../individual-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableIndividualSuitabilityModel } from '../mutable-individual-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const IndividualQuestionKeys = {
  AboutYou: 'ABOUT_YOU',
  Consent: 'CONSENT',
  Room: 'ROOM',
  Internet: 'INTERNET',
  Interpreter: 'INTERPRETER',
  Computer: 'COMPUTER',
  Camera: 'CAMERA_MICROPHONE'
};

export class IndividualModelMapper extends ParticipantModelMapper {

  map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
    const model = new MutableIndividualSuitabilityModel();
    model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
    model.aboutYou = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
    model.consent = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.Consent, response.answers);
    model.internet = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Internet);
    model.room = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Room);
    model.interpreter = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Interpreter);
    model.computer = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Computer);
    model.camera = this.mapComputerCamera(response.answers);
    model.selfTest = this.mapSelfTestAnswers(response.answers);
    model.participantId = response.participant_id;

    return model;
  }

  mapToRequest(model: MutableIndividualSuitabilityModel): HearingSuitabilityAnswer[] {
    const answers: HearingSuitabilityAnswer[] = [];
    this.addSuitabilityAnswer(model.aboutYou, IndividualQuestionKeys.AboutYou, answers);
    this.addSuitabilityAnswer(model.consent, IndividualQuestionKeys.Consent, answers);
    this.addBooleanAnswer(model.internet, IndividualQuestionKeys.Internet, answers);
    this.addBooleanAnswer(model.room, IndividualQuestionKeys.Room, answers);
    this.addBooleanAnswer(model.interpreter, IndividualQuestionKeys.Interpreter, answers);
    this.addBooleanAnswer(model.computer, IndividualQuestionKeys.Computer, answers);
    this.addAnswerForCamera(model.camera, IndividualQuestionKeys.Camera, answers);
    this.addSelfTestAnswers(model.selfTest, answers);

    return answers;
  }

  public mapComputerCamera(answers: HearingSuitabilityAnswer[]): HasAccessToCamera {
    const answer = answers.find(a => a.question_key === IndividualQuestionKeys.Camera);
    if (answer) {
      switch (answer.answer) {
        case 'Yes':
          return HasAccessToCamera.Yes;
        case 'No':
          return HasAccessToCamera.No;
        case 'Not sure':
          return HasAccessToCamera.NotSure;
        default:
          throw new Error(`Unexpected answer to computer question: ${answer.answer}`);
      }
    }
    return undefined;
  }

  public addAnswerForCamera(modelAnswer: HasAccessToCamera, key: string, answers: HearingSuitabilityAnswer[]) {
    if (modelAnswer !== undefined) {
      const answer = new HearingSuitabilityAnswer();
      answer.question_key = key;
      answer.answer = this.getAccessToCameraAnswer(modelAnswer);
      answers.push(answer);
    }
  }

  private getAccessToCameraAnswer(accessToCamera: HasAccessToCamera) {
    switch (accessToCamera) {
      case HasAccessToCamera.Yes:
        return 'Yes';
      case HasAccessToCamera.No:
        return 'No';
      case HasAccessToCamera.NotSure:
        return 'Not sure';
      default:
        throw new Error(`Unexpected answer to computer question: ${accessToCamera}`);
    }
  }
}
