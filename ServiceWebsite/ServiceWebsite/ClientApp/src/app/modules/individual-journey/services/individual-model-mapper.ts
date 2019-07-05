import { SelfTestAnswers } from './../../base-journey/participant-suitability.model';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
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

export const SelfTestQuestionKeys = {
  SameComputer: 'KIT_SAME_COMPUTER',
  SeeYourself: 'KIT_SEE_YOURSELF',
  Microphone: 'KIT_MICROPHONE',
  SeeHearClearly: 'KIT_SEE_HEAR_CLEARLY'
};

export class IndividualModelMapper extends ParticipantModelMapper {

    map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
        const model = new MutableIndividualSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.AboutYou, response.answers);
        model.consent = this.mapBooleanAnswerFromKey(IndividualQuestionKeys.Consent, response.answers);
        model.internet = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Internet);
        model.room = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Room);
        model.interpreter = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Interpreter);
        model.computer = this.mapBooleanValue(response.answers, IndividualQuestionKeys.Computer);
        model.camera = this.mapComputerCamera(response.answers);

        // Self Test
        model.selfTest = new SelfTestAnswers();
        model.selfTest.sameComputer = this.mapBooleanValue(response.answers, SelfTestQuestionKeys.SameComputer);
        model.selfTest.cameraWorking = this.mapBooleanValue(response.answers, SelfTestQuestionKeys.SeeYourself);
        model.selfTest.microphoneWorking = this.mapBooleanValue(response.answers, SelfTestQuestionKeys.Microphone);
        model.selfTest.seeAndHearClearly = this.mapBooleanValue(response.answers, SelfTestQuestionKeys.SeeHearClearly);
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

      // Self Test
      this.addBooleanAnswer(model.selfTest.sameComputer, SelfTestQuestionKeys.SameComputer, answers);
      this.addBooleanAnswer(model.selfTest.cameraWorking, SelfTestQuestionKeys.SeeYourself, answers);
      this.addBooleanAnswer(model.selfTest.microphoneWorking, SelfTestQuestionKeys.Microphone, answers);
      this.addBooleanAnswer(model.selfTest.seeAndHearClearly, SelfTestQuestionKeys.SeeHearClearly, answers);

      return answers;
    }
}
