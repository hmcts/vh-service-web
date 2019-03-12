import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ChecklistModel } from '../models/checklist.model';
import { SubmitChecklistRequestModel } from '../models/submit-checklist-request.model';
import { ProfileService } from '../services/profile.service';
import { Constants } from 'src/app/shared/constants';

@Injectable()
export class ChecklistService {

  private ApiUrl = '/api/checklist/';
  private isProfessional: boolean;

  constructor(
    private http: HttpClient, private profileService: ProfileService
  ) { }

  async submitChecklist(checklist: ChecklistModel): Promise<any> {

    const userProfile = await this.profileService.getUserProfile();
    this.isProfessional = userProfile.isProfessional;
    const request = this.mapToRequest(checklist);
    const body = JSON.stringify(request);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.ApiUrl, body, { headers: headers }).toPromise();
  }

  private mapToRequest(model: ChecklistModel): SubmitChecklistRequestModel {

    const request = new SubmitChecklistRequestModel();
    request.hearing_id = model.HearingId;
    request.user_id = model.UserId;

    if (this.isProfessional) {

      request.addAnswer(questionKeys.Equipment.SameDeviceAsNow,
        (model.UseSameComputer.Value ? 'yes' : 'no'), model.UseSameComputer.Details);

      request.addAnswer(questionKeys.SuitableRoom, (model.SuitableRoom.Value ? 'yes' : 'no'),
        model.SuitableRoom.Details);
      request.addAnswer(questionKeys.NeedsInterpreter, (model.ClientNeedInterpreter.Value ? 'yes' : 'no'),
        model.ClientNeedInterpreter.Details);
      request.addAnswer(questionKeys.Ability, (model.AbilityToTakePart.Value ? 'yes' : 'no'),
        model.AbilityToTakePart.Details);
      request.addAnswer(questionKeys.ClientAttends, (model.AboutClient.Value ? 'yes' : 'no'),
        model.AboutClient.Details);
      request.addAnswer(questionKeys.UserConsent, (model.IsHearingSuitableForVideo.Value ? 'yes' : 'no'),
        model.IsHearingSuitableForVideo.Details);
      if (model.OtherInformation.Answer.length > 0 && model.OtherInformation.Answer !== null) {
        request.addAnswer(questionKeys.OtherInformation, model.OtherInformation.Answer, null);
      }

      if (model.UseSameComputer.Value) {
        request.addAnswer(questionKeys.Equipment.Bandwidth,
          model.CheckEquipment.find(q => q.KeyName === questionKeys.Equipment.Bandwidth).Answer, null);
        request.addAnswer(questionKeys.Equipment.Browser,
          model.CheckEquipment.find(q => q.KeyName === questionKeys.Equipment.Browser).Answer, null);
        request.addAnswer(questionKeys.Equipment.CameraAndMicPresent,
          model.CheckEquipment.find(q => q.KeyName === questionKeys.Equipment.CameraAndMicPresent).Answer, null);
        request.addAnswer(questionKeys.Equipment.Device,
          model.CheckEquipment.find(q => q.KeyName === questionKeys.Equipment.Device).Answer, null);
      } else {
        // professional selected 'no' on the 'use same computer' page, add the fields for the equipment check.
        const equipmentComputerCamera = this.getEquipmentComputerCameraInformation(model);

        request.addAnswer(questionKeys.EquipmentInternet, (model.EquipmentInternet.Value ? 'yes' : 'no'), null);
        request.addAnswer(questionKeys.EquipmentLaptop, (model.EquipmentLaptop.Value ? 'yes' : 'no'), null);
        request.addAnswer(questionKeys.EquipmentComputerCamera, equipmentComputerCamera, null);
      }
    } else {
      // var equipmentComputerCamera;
      const equipmentComputerCamera = this.getEquipmentComputerCameraInformation(model);

      request.addAnswer(questionKeys.SuitableRoom, (model.SuitableRoom.Value ? 'yes' : 'no'), model.SuitableRoom.Details);
      request.addAnswer(questionKeys.NeedsInterpreter,
        (model.ClientNeedInterpreter.Value ? 'yes' : 'no'), model.ClientNeedInterpreter.Details);
      request.addAnswer(questionKeys.Ability, (model.AbilityToTakePart.Value ? 'yes' : 'no'), model.AbilityToTakePart.Details);
      request.addAnswer(questionKeys.UserConsent, (model.Consent.Value ? 'yes' : 'no'), model.Consent.Details);
      request.addAnswer(questionKeys.EquipmentPhone, (model.EquipmentPhone.Value ? 'yes' : 'no'), null);
      request.addAnswer(questionKeys.EquipmentInternet, (model.EquipmentInternet.Value ? 'yes' : 'no'), null);
      request.addAnswer(questionKeys.EquipmentLaptop, (model.EquipmentLaptop.Value ? 'yes' : 'no'), null);
      request.addAnswer(questionKeys.EquipmentComputerCamera, equipmentComputerCamera, null);
    }
    return request;
  }

  async isUserRequiredToSubmitChecklist(): Promise<boolean> {
    const result: any = await this.http.get(this.ApiUrl + 'status').toPromise();
    return result.is_required;
  }

  private getEquipmentComputerCameraInformation(model: ChecklistModel): string {
    let equipmentComputerCamera;
    if (model.EquipmentComputerCamera == null || model.EquipmentComputerCamera === undefined) {
      equipmentComputerCamera = 'no';
    } else {
      equipmentComputerCamera = model.EquipmentComputerCamera.Answer;
    }
    return equipmentComputerCamera;
  }
}


const questionKeys = {
  Equipment: {
    SameDeviceAsNow: 'EQUIPMENT_SAME_DEVICE',
    Bandwidth: 'EQUIPMENT_BANDWIDTH',
    Device: 'EQUIPMENT_DEVICE_TYPE',
    Browser: 'EQUIPMENT_BROWSER',
    CameraAndMicPresent: 'EQUIPMENT_CAM_AND_MIC_PRESENT'
  },
  OtherCircumstances: 'ANY_OTHER_CIRCUMSTANCES',
  SuitableRoom: 'SUITABLE_ROOM_AVAILABLE',
  UserConsent: 'USER_CONSENT',
  Ability: 'ANY_OTHER_CIRCUMSTANCES',
  ClientAttends: 'OTHER_PERSON_IN_ROOM',
  NeedsInterpreter: 'NEED_INTERPRETER',
  VideoHearing: 'USER_CONSENT',
  EquipmentPhone: 'EQUIPMENT_PHONE',
  EquipmentInternet: 'EQUIPMENT_INTERNET',
  EquipmentLaptop: 'EQUIPMENT_LAPTOP',
  EquipmentComputerCamera: 'EQUIPMENT_COMPUTER_CAMERA',
  EquipmentNone: 'EQUIPMENT_NONE',
  OtherInformation: 'OTHER_INFORMATION'
};
