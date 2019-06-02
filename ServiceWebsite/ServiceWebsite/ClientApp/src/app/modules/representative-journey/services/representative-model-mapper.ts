import { Hearing } from '../../base-journey/participant-suitability.model';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';
import { HearingSuitabilityResponse } from 'src/app/services/clients/api-client';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';
import { ParticipantModelMapper } from '../../base-journey/services/participant-model-mapper';

export const RepresentativeQuestionKeys = {
    AboutYou: 'ABOUT_YOU',
    AboutYourClient: 'ABOUT_YOUR_CLIENT',
    ClientAttendance: 'CLIENT_ATTENDANCE',
    HearingSuitability: 'HEARING_SUITABILITY',
    Room: 'ROOM',
    Camera: 'CAMERA_MICROPHONE',
    Computer: 'COMPUTER'
};

export class RepresentativeModelMapper extends ParticipantModelMapper {

    map(response: HearingSuitabilityResponse): RepresentativeSuitabilityModel {
        const model = new MutableRepresentativeSuitabilityModel();
        model.hearing = new Hearing(response.hearing_id, response.hearing_scheduled_at);
        // map the simple ones
        model.aboutYou = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.AboutYou, response.answers);
        model.aboutYourClient = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.AboutYourClient, response.answers);
        model.clientAttenance = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.ClientAttendance);
        model.hearingSuitability = this.mapBooleanAnswerFromKey(RepresentativeQuestionKeys.HearingSuitability, response.answers);
        model.room = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.Room);
        model.camera = this.mapComputerCamera(response.answers);
        model.computer = this.mapBooleanValue(response.answers, RepresentativeQuestionKeys.Computer);
        return model;
    }

}
