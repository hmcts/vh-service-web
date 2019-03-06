import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model';
import { PageUrls } from 'src/app/shared/page-url.constants';
import { Constants } from 'src/app/shared/constants';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-checklist-steps',
  templateUrl: './checklist-steps.component.html',
  styleUrls: ['./checklist-steps.component.css']
})
export class ChecklistStepsComponent implements OnInit {
  profile: UserProfile;
  totalSteps: number;
  stepNo: number;
  steps: Array<any>;

  ProfessionalUserSteps = [
    { Url: PageUrls.UseSameComputer, StepNo: 1 },
    { Url: PageUrls.AboutYourEquipment, StepNo: 2 },
    { Url: PageUrls.CitizenEquipment, StepNo: 2 },
    { Url: PageUrls.CompatibilityCheck, StepNo: 2 },
    { Url: PageUrls.ClientAttends, StepNo: 3 },
    { Url: PageUrls.ClientNeedInterpreter, StepNo: 4 },
    { Url: PageUrls.SuitableRoom, StepNo: 5 },
    { Url: PageUrls.AbilityToTakePart, StepNo: 6 },
    { Url: PageUrls.IsHearingSuitableForVideo, StepNo: 7 },
    { Url: PageUrls.OtherInformation, StepNo: 8 },
  ];

  CitizenUserSteps = [
    { Url: PageUrls.MakeTheCourtAware, StepNo: 1 },
    { Url: PageUrls.Interpreter, StepNo: 2 },
    { Url: PageUrls.CitizenSuitableRoom, StepNo: 3 },
    { Url: PageUrls.CitizenEquipment, StepNo: 4 },
    { Url: PageUrls.CitizenConsent, StepNo: 5 },
  ];

  constructor(
    private router: Router,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserProfile().then(p => {
      this.profile = p;
      this.steps = p.isProfessional ?  this.ProfessionalUserSteps : this.CitizenUserSteps;
      this.checkStepNumber();
    });
  }

  private checkStepNumber() {
    this.totalSteps = this.profile.isProfessional ? this.steps.length - 2 : this.steps.length;
    const step = this.steps.filter(s => s.Url === this.router.url);
    if (step && step.length > 0) {
      this.stepNo = step[0].StepNo;
    }
  }
}
