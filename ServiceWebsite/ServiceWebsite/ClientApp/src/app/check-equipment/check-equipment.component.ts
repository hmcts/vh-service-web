import { Component, OnInit } from '@angular/core';
import { Constants } from '../shared/constants';
import { Router } from '@angular/router';
import { PageUrls } from '../shared/page-url.constants';

import { Observable, Subscription } from 'rxjs';
import "rxjs/add/observable/interval";
import "rxjs/add/observable/timer";

import { SpeedTestService } from '../services/speedtest.service';
import { NavigatorService } from './navigator.service';
import { PageTrackerService } from "../services/page-tracker.service";

// Model
import { UserProfile } from '../models/user-profile.model';
import { SpeedTestModel } from '../models/speedtest.model';
import { CheckEquipmentModel } from '../models/check-equipment.model';

import { CheckListEquipmentModel } from '../models/checklist.model';
import { ChecklistSessionService } from '../services/checklist-session.service';
import { HearingService } from '../services/hearing.service';
import { ProfileService } from '../services/profile.service';
import { Hearing } from '../models/hearing.model';
import { ChecklistBaseComponent } from '../shared/checklist-base-component/checklist-base.component';


@Component({
  selector: 'app-check-equipment',
  templateUrl: './check-equipment.component.html',
  styleUrls: ['./check-equipment.component.css']
})
export class CheckEquipmentComponent extends ChecklistBaseComponent implements OnInit {
  userProfile: UserProfile;
  hearingDetails: Hearing;
  localeResources: any;
  SPEED: string;
  DEVICE: string;
  BROWSER: string;
  MEDIA: string;
  AUDIOINPUT = 'audioinput';
  VIDEOINPUT = 'videoinput';
  checks: Array<CheckEquipmentModel> = [];
  speedTestResult: SpeedTestModel;
  testCompleted = false;
  timer$ = Observable.interval(500);
  timerSubcription: Subscription;
  checkValue: number;
  deviceType$: Observable<any>;
  browserType$: Observable<any>;
  showContinueButton: boolean = false;
  errorMessageDeviceType: boolean = false;
  isRunTest: boolean = true;
  isIE: boolean = false;
  EQUIPMENT_DEVICE_TYPE = 'EQUIPMENT_DEVICE_TYPE';
  EQUIPMENT_BANDWIDTH = 'EQUIPMENT_BANDWIDTH';
  EQUIPMENT_BROWSER = 'EQUIPMENT_BROWSER';

  constructor(
    protected pageTrackerService: PageTrackerService,
    private speedTestService: SpeedTestService,
    private navigatorService: NavigatorService,
    protected profileService: ProfileService,
    protected checklistSessionService: ChecklistSessionService,
    protected hearingService: HearingService,
    private router: Router,
  ) {
    super(hearingService, profileService, checklistSessionService);

    this.createChecksList();
    this.deviceType$ = new Observable(subscriber => {
      let info = this.navigatorService.navigatorDeviceInfo();
      subscriber.next(info);
    });

    this.browserType$ = new Observable(subcriber => {
      let typeOfBrowser = this.navigatorService.agentInfo();
      subcriber.next(typeOfBrowser);
    });
  }

  ngOnInit() {
    this.loadHearingDetails().then(() => {
      this.checkInternetSpeed();
    });
  }

  checkInternetSpeed() {
    let previousUrl = this.pageTrackerService.getPreviousUrl();
    if (previousUrl === PageUrls.AboutYourEquipment) {
      this.isRunTest = true;
    } else {
      this.isRunTest = false;
    }
    this.initialize();
    if (this.isRunTest) {
      setTimeout(() => {
        this.runSpeedTest();
      }, 1000);
    }
  }

  createChecksList() {
    this.SPEED = this.localeResources.InternetSpeed;
    this.MEDIA = this.localeResources.CameraAndMicrophonePresent;
    this.DEVICE = this.localeResources.DeviceType;
    this.BROWSER = this.localeResources.Browser;
    this.checks = [
      new CheckEquipmentModel(this.SPEED, this.EQUIPMENT_BANDWIDTH),
      new CheckEquipmentModel(this.DEVICE, this.EQUIPMENT_DEVICE_TYPE),
      new CheckEquipmentModel(this.BROWSER, this.EQUIPMENT_BROWSER),
      new CheckEquipmentModel(this.MEDIA, Constants.LocalStorageKeys.CheckEquipmentMedia)
    ];
  }

  initialize() {
    if (!this.isRunTest && this.checklist && this.checklist.CheckEquipment && this.checklist.CheckEquipment.length > 0) {
      let error = false
      for (let check of this.checks) {
        let checkFromStorage = this.checklist.CheckEquipment.find(key => key.KeyName === check.checkKey);
        check.checkError = checkFromStorage.KeyName === this.EQUIPMENT_DEVICE_TYPE && checkFromStorage.Answer !== this.localeResources.Devices.Computer ? this.localeResources.ErrorMessageDeviceType : "";
        check.checkResult = checkFromStorage.Answer;
        check.checkValue = 100;
        if (check.checkError.length > 0) {
          error = true;
        }
      }
      this.showContinueButton = !error;
    }
  }

  runInterval(actionName: string) {
    const self = this;
    this.timerSubcription = this.timer$.subscribe(() => {
      let check = self.checks.find(c => c.checkTitle === actionName);
      check.checkValue++;
    });
  }

  checkDeviceType() {
    const self = this;
    this.runInterval(this.DEVICE);
    setTimeout(() => {
      self.deviceType$.subscribe(type => {
        let check = self.checks.find(c => c.checkTitle === self.DEVICE);
        check.checkResult = type;
        this.errorMessageDeviceType = type === this.localeResources.Devices.Mobile ||
          type === this.localeResources.Devices.Tablet;
        if (this.errorMessageDeviceType) {
          check.checkError = this.localeResources.ErrorMessageDeviceType;
        }

        check.checkValue = 100;
        self.timerSubcription.unsubscribe();
        self.checkBrowserType();
      });
    }, 2000);
  }

  checkBrowserType() {
    const self = this;
    self.runInterval(self.BROWSER);
    setTimeout(() => {
      self.browserType$.subscribe(type => {
        let check = self.checks.find(c => c.checkTitle === self.BROWSER);
        check.checkResult = type;
        check.checkValue = 100;
        self.timerSubcription.unsubscribe();

        if (check.checkResult === 'IE') {
          self.getMediaDevicesIE();
        } else {
          self.getMediaDevices();
        }
      });
    }, 2000);
  }

  getMediaDevices() {
    const self = this;
    self.runInterval(self.MEDIA);

    setTimeout(() => {
      self.navigatorService.mediaDeviceInfo();
      self.navigatorService.mediaDevices$.subscribe(deviceInfo => {
        let check = self.checks.find(c => c.checkTitle === self.MEDIA);
        let cameraPresent = false;
        let microphonePresent = false;
        if (deviceInfo) {
          for (let device of deviceInfo) {
            if (device.kind === self.AUDIOINPUT) {
              microphonePresent = true;
            } else if (device.kind === self.VIDEOINPUT) {
              cameraPresent = true;
            }
          }
        }
        let cameraMsg = cameraPresent ? this.localeResources.CameraPresent : this.localeResources.CameraNotPresent;
        let microphoneMsg = microphonePresent ? this.localeResources.MicrophonePresent : this.localeResources.MicrophoneNotPresent;

        check.checkResult = `${cameraMsg}, ${microphoneMsg.toLowerCase()}`;
        check.checkValue = 100;
        this.showContinueButton = !this.errorMessageDeviceType;
      });
    }, 2000);

    setTimeout(() => {
      self.timerSubcription.unsubscribe();
    }, 5000);
  }

  getMediaDevicesIE() {
    this.runInterval(this.MEDIA);
    let check = this.checks.find(c => c.checkTitle === this.MEDIA);
    check.checkResult = 'Cannot be detected in this browser.';
    check.checkValue = 100;
    this.showContinueButton = !this.errorMessageDeviceType;
  }

  runSpeedTest() {
    const self = this;
    this.runInterval(self.SPEED);
    this.speedTestService.click();
    this.speedTestService.speedTestState$
      .subscribe((state: SpeedTestModel) => {
        self.testCompleted = true;
        let check = self.checks.find(c => c.checkTitle === self.SPEED);
        check.checkResult = `${Math.ceil(state.DownloadSpeed)}MBs ${this.localeResources.Download}, ${Math.ceil(state.UploadSpeed)}MBs ${this.localeResources.Upload}`;
        check.checkValue = 100;
        self.timerSubcription.unsubscribe();
        this.checkDeviceType();
      });
  }

  continue() {
    if (this.checklist) {
      this.checklist.CheckEquipment = [];
      for (let check of this.checks) {
        let newItem = new CheckListEquipmentModel(check.checkKey, check.checkResult);
        this.checklist.CheckEquipment.push(newItem);
      }
      this.checklistSessionService.saveChecklist(this.checklist);
      this.router.navigate([PageUrls.ClientAttends]);
    }
  }
}
