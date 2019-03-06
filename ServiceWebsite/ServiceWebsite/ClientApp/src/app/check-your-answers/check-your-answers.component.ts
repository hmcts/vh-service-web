import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageUrls } from '../shared/page-url.constants';
import { Hearing } from '../models/hearing.model';
import { ChecklistModel, CheckListEquipmentModel } from '../models/checklist.model';
import { UserProfile } from '../models/user-profile.model';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';
import { ChecklistService } from '../services/checklist.service';
import { FormGroup } from '@angular/forms';
import { Constants } from '../shared/constants';
import { ChecklistSummaryModel } from '../models/checklist-summary.model';
import { SessionStorage } from '../services/session-storage';

@Component({
  selector: 'app-check-your-answers',
  templateUrl: './check-your-answers.component.html'
})
export class CheckYourAnswersComponent implements OnInit {
  localeResources: any;
  checklist: ChecklistModel;
  userProfile: UserProfile;
  answersForm: FormGroup;
  saveFailed: boolean;
  errors: any;
  isProfessional: boolean;
  checklistSubmitted: boolean = false;
 // questionAnswer: TextQuestionModel;

  suitableRoom: string;
  ability: string;
  clientAttends: string;
  needInterpreter: string;
  suitableForVH: string;
  otherInfo: string;
  canSubmit: boolean = false;

  equipmentComputerCamera: string;
  summaryModelList: Array<ChecklistSummaryModel> = [];

  constructor(private router: Router,
    private hearingDetails: HearingService,
    private profileService: ProfileService,
    private checklistService: ChecklistService,
    private checklistSession: ChecklistSessionService,
    private sessionStorage: SessionStorage) {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  async ngOnInit() {
    // check if the checklist is submitted.
    if (!(await this.checklistService.isUserRequiredToSubmitChecklist())) {
      this.router.navigate([PageUrls.ChecklistAlreadySubmitted]);
    }

    this.hearingDetails.getNextHearingDetails()
      .then(details => this.loadChecklist(details));
  }

  async loadChecklist(hearingDetails: Hearing) {
    this.canSubmit = false;
    const userProfile = await this.profileService.getUserProfile();
    this.checklist = this.checklistSession.getChecklist(hearingDetails.id, userProfile.email);

    this.isProfessional = userProfile.isProfessional;

    this.suitableRoom = this.checklist.SuitableRoom.Value ? 'Yes' : 'No';
    this.ability = this.checklist.AbilityToTakePart.Value ? 'Yes' : 'No';
    this.clientAttends = this.checklist.AboutClient.Value ? 'Yes' : 'No';
    this.needInterpreter = this.checklist.ClientNeedInterpreter.Value ? 'Yes' : 'No';
    this.suitableForVH = this.checklist.IsHearingSuitableForVideo.Value ? 'Yes' : 'No';

    this.equipmentComputerCamera = this.parseEquipmentComputerCameraAnswer(this.checklist.EquipmentComputerCamera);
    this.populateChecklistSummary();
  }

  populateChecklistSummary() {
    this.summaryModelList = [];
    if (this.isProfessional) {

      // professional selected 'no' on the 'use same computer' page, add the fields for the equipment check.
      if (!this.checklist.UseSameComputer.Value) {
        this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question5,
          this.getAnswer(this.checklist.EquipmentInternet.Value), PageUrls.CitizenEquipment, false));
        this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question6,
          this.getAnswer(this.checklist.EquipmentLaptop.Value), PageUrls.CitizenEquipment, false));
        this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.ProfessionalAboutEquipment.Question7,
          this.equipmentComputerCamera, PageUrls.CitizenEquipment, false));
      }

      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.ClientAttendance,
        this.clientAttends, PageUrls.ClientAttends, false));

      if (this.checklist.AboutClient.Value) {
        this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.NeedInterpreter,
          this.needInterpreter, PageUrls.ClientNeedInterpreter, false));
      }

      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.SuitableRoom,
        this.suitableRoom, PageUrls.SuitableRoom, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.AbilityVideoHearing,
        this.ability, PageUrls.AbilityToTakePart, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.IsVideoHearingSuitable,
        this.suitableForVH, PageUrls.HearingSuitablility, false));

      if (this.checklist.OtherInformation !== null && this.checklist.OtherInformation.Answer !== null) {
        this.otherInfo = this.checklist.OtherInformation.Answer;
      }
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CheckAnswers.OtherInformation,
        this.otherInfo, PageUrls.OtherInformation, true));

    } else {
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question1,
        this.getAnswer(this.checklist.AbilityToTakePart.Value), PageUrls.MakeTheCourtAware, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question2,
        this.getAnswer(this.checklist.ClientNeedInterpreter.Value), PageUrls.Interpreter, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question3,
        this.getAnswer(this.checklist.SuitableRoom.Value), PageUrls.CitizenSuitableRoom, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question4,
        this.getAnswer(this.checklist.EquipmentPhone.Value), PageUrls.CitizenEquipment, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question5,
        this.getAnswer(this.checklist.EquipmentInternet.Value), PageUrls.CitizenEquipment, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question6,
        this.getAnswer(this.checklist.EquipmentLaptop.Value), PageUrls.CitizenEquipment, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question7,
        this.equipmentComputerCamera, PageUrls.CitizenEquipment, false));
      this.summaryModelList.push(new ChecklistSummaryModel(this.localeResources.CitizenCheckAnswers.Question8,
        this.getAnswer(this.checklist.Consent.Value), PageUrls.CitizenConsent, false));
    }
    // this.summaryModelList.sort(this.dynamicSort('Sequence'));

    this.canSubmit = true;
  }

  private dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

  getAnswer(value: boolean) {
    return value ? 'Yes' : 'No';
  }

  parseEquipmentComputerCameraAnswer(equipmentComputerCamera: CheckListEquipmentModel): string {
    var answer;
    if (equipmentComputerCamera === undefined || equipmentComputerCamera == null) {
      answer = 'No';
    } else {
      if (equipmentComputerCamera.Answer.toLowerCase() === 'yes') {
        answer = 'Yes';
      } else if (equipmentComputerCamera.Answer.toLowerCase() === 'no') {
        answer = 'No';
      } else if (equipmentComputerCamera.Answer.toLowerCase() === 'notsure') {
        answer = 'Not sure';
      }
    }
    return answer;
  }

  submit(): void {
    this.checklistService.submitChecklist(this.checklist)
      .then(data => {
        console.log(data);
        this.checklistSession.clearCheckList();
        this.router.navigate([PageUrls.ChecklistThankyou]);
      });
  }

  changeAnswer() {
    this.sessionStorage.setItem(Constants.LocalStorageKeys.EditModeChecklist, 'true');
  }
}

