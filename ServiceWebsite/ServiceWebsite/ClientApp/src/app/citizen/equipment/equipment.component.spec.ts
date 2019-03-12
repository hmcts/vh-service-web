import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router} from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';
import { ChecklistService } from 'src/app/services/checklist.service';
import { MockChecklistService } from 'src/tests/mock-checklist.service';
import { ChecklistSessionService } from 'src/app/services/checklist-session.service';
import { MockChecklistSessionService } from 'src/tests/mock-checklist-session.service';
import { HearingService } from 'src/app/services/hearing.service';
import { By } from '@angular/platform-browser';
import { EquipmentComponent } from './equipment.component';
import {
  BackNavigationStubComponent,
  ChecklistFooterStubComponent,
  ChecklistStepsStubComponent,
  BeforeunloadStubComponent,
  ShowDetailsStubComponent
} from '../../../tests/component-stubs';
import { Hearing } from '../../models/hearing.model';
import { MockSessionStorage } from 'src/tests/mock-session-storage';
import { SessionStorage } from '../../services/session-storage';

describe('EquipmentComponent', () => {
  let component: EquipmentComponent;
  let fixture: ComponentFixture<EquipmentComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;
  const hearingServiceSpy: jasmine.SpyObj<HearingService> =
    jasmine.createSpyObj<HearingService>('HearingService', ['getNextHearingDetails']);

  beforeEach(async(() => {

    hearingServiceSpy.getNextHearingDetails.and.returnValue(new Promise<Hearing>((resolve, reject) => { resolve(new Hearing()); }));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:
        [
          EquipmentComponent,
          BackNavigationStubComponent,
          ChecklistFooterStubComponent,
          ChecklistStepsStubComponent,
          BeforeunloadStubComponent,
          ShowDetailsStubComponent,
        ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService },
        { provide: ChecklistService, useClass: MockChecklistService },
        { provide: ChecklistSessionService, useClass: MockChecklistSessionService },
        { provide: HearingService, useValue: hearingServiceSpy },
        { provide: SessionStorage, useClass: MockSessionStorage },
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrieve checklist from storage with no set values', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();
    expect(component.checklist).toBeTruthy();
    expect(component.checklist.EquipmentPhone).toBeTruthy();
    expect(component.checklist.EquipmentInternet).toBeTruthy();
    expect(component.checklist.EquipmentLaptop).toBeTruthy();
    expect(component.checklist.EquipmentNone).toBeTruthy();
    expect(component.checklist.EquipmentComputerCamera).toBe(undefined);

    expect(component.checklist.EquipmentPhone.IsValueSet).toBeFalsy();
    expect(component.checklist.EquipmentInternet.IsValueSet).toBeFalsy();
    expect(component.checklist.EquipmentLaptop.IsValueSet).toBeFalsy();
    expect(component.checklist.EquipmentNone.IsValueSet).toBeFalsy();
  }));
  it('should click on phone checkBox and checked', () => {
    const phoneCheckbox = fixture.debugElement.query(By.css('#phone-1')).nativeElement;
    phoneCheckbox.click();
    phoneCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const phoneControl = component.equipmentForm.get('phone');
    expect(phoneControl.value).toBeTruthy();
    expect(component.phoneSelected).toBeTruthy();
    expect(component.noneSelected).toBeFalsy();
  });
  it('should click on internet connection checkBox and checked', () => {
    const internetCheckbox = fixture.debugElement.query(By.css('#internet-2')).nativeElement;
    internetCheckbox.click();
    internetCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const internetControl = component.equipmentForm.get('internetConnection');
    expect(internetControl.value).toBeTruthy();
    expect(component.internetSelected).toBeTruthy();
    expect(component.noneSelected).toBeFalsy();
  });
  it('should click on laptop checkBox and checked', () => {
    const laptopCheckbox = fixture.debugElement.query(By.css('#laptop-3')).nativeElement;
    laptopCheckbox.click();
    laptopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const laptopControl = component.equipmentForm.get('laptop');
    expect(laptopControl.value).toBeTruthy();
    expect(component.laptopSelected).toBeTruthy();
    expect(component.noneSelected).toBeFalsy();
  });
  it('should click on desktop checkBox and checked', () => {
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const desktopControl = component.equipmentForm.get('desktop');
    expect(desktopControl.value).toBeTruthy();
    expect(component.desktopSelected).toBeTruthy();
    expect(component.noneSelected).toBeFalsy();
  });
  it('should click on none checkBox and checked', () => {
    const laptopCheckbox = fixture.debugElement.query(By.css('#laptop-3')).nativeElement;
    laptopCheckbox.click();
    laptopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const noneCheckbox = fixture.debugElement.query(By.css('#none-5')).nativeElement;
    noneCheckbox.click();
    noneCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const noneControl = component.equipmentForm.get('noneOfAbove');
    expect(noneControl.value).toBeTruthy();
    expect(component.noneSelected).toBeTruthy();
    expect(component.phoneSelected).toBeFalsy();
    expect(component.laptopSelected).toBeFalsy();
    expect(component.internetSelected).toBeFalsy();
    expect(component.desktopSelected).toBeFalsy();
  });
  it('should click on phone checkBox and checked, the "none of above" option should be false', () => {
    // checked none of above option
    const noneCheckbox = fixture.debugElement.query(By.css('#none-5')).nativeElement;
    noneCheckbox.click();
    noneCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const noneControl = component.equipmentForm.get('noneOfAbove');
    expect(noneControl.value).toBeTruthy();
    // check phone option
    const phoneCheckbox = fixture.debugElement.query(By.css('#phone-1')).nativeElement;
    phoneCheckbox.click();
    phoneCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const phoneControl = component.equipmentForm.get('phone');
    expect(phoneControl.value).toBeTruthy();
    expect(component.phoneSelected).toBeTruthy();
    expect(component.noneSelected).toBeFalsy();
  });
  it('should click on radio button camera options and set value to notSure', () => {
    // make visible radio buttons by clicking the desktop check box
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const cameraRadio = fixture.debugElement.query(By.css('#notsure-1')).nativeElement;
    cameraRadio.click();
    cameraRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const cameraControl = component.equipmentForm.get('hasCamera');
    expect(cameraControl.value).toBe('notSure');
    expect(component.selectedAnswerCamera).toBe('notSure');
  });
  it('should click on radio button camera options and set value to yes', () => {
    // make visible radio buttons by clicking the desktop check box
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const cameraRadio = fixture.debugElement.query(By.css('#yes-2')).nativeElement;
    cameraRadio.click();
    cameraRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const cameraControl = component.equipmentForm.get('hasCamera');
    expect(cameraControl.value).toBe('yes');
    expect(component.selectedAnswerCamera).toBe('yes');
  });
  it('should click on radio button camera options and set value to no', () => {
    // make visible radio buttons by clicking the desktop check box
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const cameraRadio = fixture.debugElement.query(By.css('#no-3')).nativeElement;
    cameraRadio.click();
    cameraRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const cameraControl = component.equipmentForm.get('hasCamera');
    expect(cameraControl.value).toBe('no');
    expect(component.selectedAnswerCamera).toBe('no');
  });
  it('should show error message to select checkbox options', () => {
    component.continue();
    fixture.detectChanges();
    expect(component.needCameraCheck).toBeFalsy();
    expect(component.optionDeviceValid).toBeFalsy();
  });
  it('should show error message to select camera option if desktop option selected', () => {
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    component.continue();
    fixture.detectChanges();
    expect(component.needCameraCheck).toBeTruthy();
    expect(component.optionDeviceValid).toBeTruthy();
  });
  it('should save checklist with all options:phone,internet,laptop,desktop and camera exist, and navigate to next page', fakeAsync(() => {
    fixture.detectChanges();
    component.ngOnInit();
    tick();

    // select has phone
    const phoneCheckbox = fixture.debugElement.query(By.css('#phone-1')).nativeElement;
    phoneCheckbox.click();
    phoneCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // select has internet connection
    const internetCheckbox = fixture.debugElement.query(By.css('#internet-2')).nativeElement;
    internetCheckbox.click();
    internetCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // select has laptop
    const laptopCheckbox = fixture.debugElement.query(By.css('#laptop-3')).nativeElement;
    laptopCheckbox.click();
    laptopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // select has desktop
    const desktopCheckbox = fixture.debugElement.query(By.css('#desktop-4')).nativeElement;
    desktopCheckbox.click();
    desktopCheckbox.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // select has camera
    const cameraRadio = fixture.debugElement.query(By.css('#yes-2')).nativeElement;
    cameraRadio.click();
    cameraRadio.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    component.continue();

    fixture.detectChanges();
    expect(component.needCameraCheck).toBeFalsy();
    expect(component.optionDeviceValid).toBeTruthy();
    expect(component.checklist.EquipmentPhone.Value).toBeTruthy();
    expect(component.checklist.EquipmentInternet.Value).toBeTruthy();
    expect(component.checklist.EquipmentLaptop.Value).toBeTruthy();
    expect(component.checklist.EquipmentComputerCamera.Answer).toBe('yes');
    expect(routerSpy.navigate).toHaveBeenCalled();
  }));

});

