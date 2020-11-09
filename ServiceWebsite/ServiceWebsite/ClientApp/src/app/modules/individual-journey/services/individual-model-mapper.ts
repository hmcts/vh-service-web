import { Hearing } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';
import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export class IndividualModelMapper extends ParticipantModelMapper {
    map(response: HearingSuitabilityResponse): IndividualSuitabilityModel {
        const model = new IndividualSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at, null, null, response.questionnaire_not_required);
        model.selfTest = this.mapSelfTestAnswers(response.answers);
        model.participantId = response.participant_id;

        return model;
    }

    mapToRequest(model: IndividualSuitabilityModel): HearingSuitabilityAnswer[] {
        const answers: HearingSuitabilityAnswer[] = [];
        this.addSelfTestAnswers(model.selfTest, answers);

        return answers;
    }
}
