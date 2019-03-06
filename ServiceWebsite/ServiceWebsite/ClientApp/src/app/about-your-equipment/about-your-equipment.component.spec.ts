import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AboutYourEquipmentComponent } from 'src/app/about-your-equipment/about-your-equipment.component';
import { ChecklistFooterStubComponent, BeforeunloadStubComponent, ShowDetailsStubComponent } from 'src/tests/component-stubs';
import { BackNavigationComponent } from 'src/app/back-navigation/back-navigation.component';
import { ChecklistStepsComponent } from 'src/app/checklist-steps/checklist-steps.component';
import { Location } from '@angular/common';
import { ErrorService } from 'src/app/services/error.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MockProfileService } from 'src/tests/mock-profile.service';

describe('AboutYourEquipmentComponent', () => {
  let component: AboutYourEquipmentComponent;
  let fixture: ComponentFixture<AboutYourEquipmentComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);
  const errorServiceSpy: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj<ErrorService>('ErrorService', ['handle']);
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutYourEquipmentComponent,
        ChecklistFooterStubComponent,
        ChecklistStepsComponent,
        BackNavigationComponent,
        BeforeunloadStubComponent,
        ShowDetailsStubComponent,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy },
        { provide: ErrorService, useValue: errorServiceSpy },
        { provide: ProfileService, useClass: MockProfileService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutYourEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
