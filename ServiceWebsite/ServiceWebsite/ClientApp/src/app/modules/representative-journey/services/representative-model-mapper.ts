import { Hearing } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityModel, AppointingBarrister, AppointingBarristerDetails } from '../representative-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const RepresentativeQuestionKeys = {
  Barrister: 'APPOINTING_BARRISTER',
  BarristerName: 'BARRISTER_NAME',
  BarristerChambers: 'BARRISTER_CHAMBERS',
  BarristerEmail: 'BARRISTER_EMAIL'
};

export class RepresentativeModelMapper extends ParticipantModelMapper {

  map(response: HearingSuitabilityResponse): RepresentativeSuitabilityModel {
    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
    model.appointingBarrister = this.mapAppointedBarristerAnswer(response.answers);
    model.appointingBarristerDetails = this.mapAppointedBarristerDetaild(response.answers);
    model.selfTest = this.mapSelfTestAnswers(response.answers);
    model.participantId = response.participant_id;
    return model;
  }

  mapToRequest(model: MutableRepresentativeSuitabilityModel): HearingSuitabilityAnswer[] {
    const answers: HearingSuitabilityAnswer[] = [];
    this.addAnswerForBarrister(model.appointingBarrister, RepresentativeQuestionKeys.Barrister, answers);

    if (model.appointingBarrister === AppointingBarrister.BarristerWillBeAppointed) {
      this.addAnswerForBarristerDetails(model.appointingBarristerDetails.fullName, RepresentativeQuestionKeys.BarristerName, answers);
      this.addAnswerForBarristerDetails(model.appointingBarristerDetails.chambers, RepresentativeQuestionKeys.BarristerChambers, answers);
      this.addAnswerForBarristerDetails(model.appointingBarristerDetails.email, RepresentativeQuestionKeys.BarristerEmail, answers);
    }

    this.addSelfTestAnswers(model.selfTest, answers);

    return answers;
  }

  public addAnswerForBarrister(modelAnswer: AppointingBarrister, key: string, answers: HearingSuitabilityAnswer[]) {
    if (modelAnswer !== undefined) {
      const answer = new HearingSuitabilityAnswer();
      answer.question_key = key;
      answer.answer = this.getAppointedBarristerAnswer(modelAnswer);
      answers.push(answer);
    }
  }

  public addAnswerForBarristerDetails(modelAnswer: string, key: string, answers: HearingSuitabilityAnswer[]) {
    const answer = this.createTextSelfTestAnswer(key, modelAnswer);
    answers.push(answer);
  }

  mapAppointedBarristerDetaild(answers: HearingSuitabilityAnswer[]): AppointingBarristerDetails {
    const barristerDetails = new AppointingBarristerDetails();
    answers.forEach(a => {
      switch (a.question_key) {
        case RepresentativeQuestionKeys.BarristerName:
          barristerDetails.fullName = a.answer;
          break;
        case RepresentativeQuestionKeys.BarristerChambers:
          barristerDetails.chambers = a.answer;
          break;
        case RepresentativeQuestionKeys.BarristerEmail:
          barristerDetails.email = a.answer;
          break;
      }
    });

    return barristerDetails;
  }

  private getAppointedBarristerAnswer(appointedBarrister: AppointingBarrister) {
    switch (appointedBarrister) {
      case AppointingBarrister.IAmAppointedBarrister:
        return 'I am the appointed barrister';
      case AppointingBarrister.BarristerWillBeAppointed:
        return 'A barrister has been/will be appointed';
      case AppointingBarrister.BarristerWillNotBeAppointed:
        return 'A barrister will not be appointed';
      default:
        throw new Error(`Unexpected answer to appointing barrister question: ${appointedBarrister}`);
    }
  }

  public mapAppointedBarristerAnswer(answers: HearingSuitabilityAnswer[]): AppointingBarrister {
    const answer = answers.find(a => a.question_key === RepresentativeQuestionKeys.Barrister);
    if (answer) {
      switch (answer.answer) {
        case 'I am the appointed barrister':
          return AppointingBarrister.IAmAppointedBarrister;
        case 'A barrister has been/will be appointed':
          return AppointingBarrister.BarristerWillBeAppointed;
        case 'A barrister will not be appointed':
          return AppointingBarrister.BarristerWillNotBeAppointed;
        default:
          throw new Error(`Unexpected answer to appointing barrister question: ${answer.answer}`);
      }
    }
    return undefined;
  }
}
