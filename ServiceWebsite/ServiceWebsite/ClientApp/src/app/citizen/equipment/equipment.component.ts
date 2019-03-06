import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {  CheckListEquipmentModel } from '../../models/checklist.model';
import { ChecklistSessionService } from '../../services/checklist-session.service';
import { HearingService } from '../../services/hearing.service';
import { ProfileService } from '../../services/profile.service';
import { PageUrls } from '../../shared/page-url.constants';
import { Constants } from '../../shared/constants';
import { SessionStorage } from '../../services/session-storage';
import { ChecklistEditBaseComponent } from '../../shared/checklist-base-component/checklist-edit-base.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent extends ChecklistEditBaseComponent implements OnInit {
  model: any = {
  };
  equipmentForm: FormGroup;
  phone: FormControl;
  internetConnection: FormControl;
  laptop: FormControl;
  desktop: FormControl;
  noneOfAbove: FormControl;
  hasCamera: FormControl;

  phoneSelected: boolean = false;
  internetSelected: boolean = false;
  laptopSelected: boolean = false;
  desktopSelected: boolean = false;
  noneSelected: boolean = false;
  isProfessional: boolean;

  needCameraCheck = false;
  selectedAnswerCamera: string;
  optionDeviceValid = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    protected hearingService: HearingService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected sessionStorage: SessionStorage) {
    super(sessionStorage, hearingService, profileService, checklistSessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupEquipmentForm();
   
    this.loadHearingDetails().then(() => {
      this.populatePreviousAnswers();
    });
  }

  setupEquipmentForm() {
    this.phone = new FormControl('');
    this.internetConnection = new FormControl('');
    this.laptop = new FormControl('');
    this.desktop = new FormControl('');
    this.noneOfAbove = new FormControl('');
    this.hasCamera = new FormControl('');
    this.equipmentForm = this.fb.group({
      phone: this.phone,
      internetConnection: this.internetConnection,
      laptop: this.laptop,
      desktop: this.desktop,
      noneOfAbove: this.noneOfAbove,
      hasCamera: this.hasCamera
    });

    this.equipmentForm.get('hasCamera').valueChanges.subscribe(value => this.setAnswerCamera(value));
    this.equipmentForm.get('phone').valueChanges.subscribe(x => this.setPhoneOption(x));
    this.equipmentForm.get('internetConnection').valueChanges.subscribe(x => this.setInternetOption(x));
    this.equipmentForm.get('laptop').valueChanges.subscribe(x => this.setLaptopOption(x));
    this.equipmentForm.get('desktop').valueChanges.subscribe(x => this.setDesktopOption(x));
    this.equipmentForm.get('noneOfAbove').valueChanges.subscribe(x => this.setNoneOption(x));
  }


  populatePreviousAnswers() {
    if (this.checklist) {
      if (this.checklist.EquipmentPhone.Value) {
        this.equipmentForm.patchValue({ phone: true });
      }
      if (this.checklist.EquipmentInternet.Value) {
        this.equipmentForm.patchValue({ internetConnection: true });
      }
      if (this.checklist.EquipmentLaptop.Value) {
        this.equipmentForm.patchValue({ laptop: true });
      }
      if (this.checklist.EquipmentComputerCamera && this.checklist.EquipmentComputerCamera.Answer) {
        this.equipmentForm.patchValue({ desktop: true });
        this.equipmentForm.patchValue({ hasCamera: this.checklist.EquipmentComputerCamera.Answer });
      }
      if (this.checklist.EquipmentNone.Value) {
        this.equipmentForm.patchValue({ noneOfAbove: true });
      }
    }
  }

  setPhoneOption(value) {
    this.phoneSelected = value;
    this.resetNoneOption(value);
  }

  resetNoneOption(value) {
    if (value) {
      this.optionDeviceValid = true;
      this.noneOfAbove.setValue(false);
      this.noneSelected = false;
    }
  }

  setInternetOption(value) {
    this.internetSelected = value;
    this.resetNoneOption(value);
  }

  setLaptopOption(value) {
    this.laptopSelected = value;
    this.resetNoneOption(value);
  }

  setDesktopOption(value) {
    this.desktopSelected = value;
    this.resetNoneOption(value);
    if (!this.desktopSelected) {
      this.hasCamera.setValue(null);
    }
  }

  setNoneOption(value) {
    this.noneSelected = value;
    if (value) {
      this.optionDeviceValid = true;
      this.phone.setValue(false);
      this.internetConnection.setValue(false);
      this.laptop.setValue(false);
      this.desktop.setValue(false);
      this.hasCamera.setValue(null);
    }
  }

  setAnswerCamera(answer: string): void {
    this.selectedAnswerCamera = answer;
    this.needCameraCheck = false;
  }

  deviceOptionSelected() {
    return this.phoneSelected ||
      this.internetSelected ||
      this.laptopSelected ||
      this.desktopSelected ||
      this.noneSelected;
  }

  continue() {
    this.needCameraCheck = this.desktopSelected && (this.hasCamera.value == null || this.hasCamera.value.length == 0);
    this.optionDeviceValid = this.deviceOptionSelected();
    if (this.needCameraCheck || !this.optionDeviceValid) {
      return;
    }

    this.checklist.EquipmentNone.Value = this.noneSelected;
    this.checklist.EquipmentPhone.Value = this.phoneSelected;
    this.checklist.EquipmentInternet.Value = this.internetSelected;
    this.checklist.EquipmentLaptop.Value = this.laptopSelected;
    if (this.desktopSelected) {
      this.checklist.EquipmentComputerCamera = new CheckListEquipmentModel(Constants.LocalStorageKeys.CheckEquipmentMedia,
         this.selectedAnswerCamera);
    }
    if (this.noneSelected || !this.desktopSelected) {
      // cleans previous camera option value
      this.checklist.EquipmentComputerCamera = null;
    }

    this.checklistSessionService.saveChecklist(this.checklist);
    if (this.editMode) {
      this.resetEditMode();
      this.router.navigate([PageUrls.CheckYourAnswer]);
    } else {
      // this.router.navigate([PageUrls.CitizenConsent]);
      if (this.isProfessional) {
        this.router.navigate([PageUrls.ClientAttends]);
      } else {
        this.router.navigate([PageUrls.CitizenConsent]);
      }
    }
  }
}
