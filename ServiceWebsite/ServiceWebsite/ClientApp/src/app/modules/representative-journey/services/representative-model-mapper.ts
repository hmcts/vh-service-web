import { Hearing } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const RepresentativeQuestionKeys = {
    Camera: 'CAMERA_MICROPHONE'
};

export class RepresentativeModelMapper extends ParticipantModelMapper {

    map(response: HearingSuitabilityResponse): RepresentativeSuitabilityModel {
        const model = new MutableRepresentativeSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
        model.camera = this.mapComputerCamera(response.answers);
        model.selfTest = this.mapSelfTestAnswers(response.answers);
        model.participantId = response.participant_id;

        return model;
    }

    mapToRequest(model: MutableRepresentativeSuitabilityModel): HearingSuitabilityAnswer[] {
        const answers: HearingSuitabilityAnswer[] = [];
        this.addAnswerForCamera(model.camera, RepresentativeQuestionKeys.Camera, answers);
        this.addSelfTestAnswers(model.selfTest, answers);

        return answers;
      }

}
